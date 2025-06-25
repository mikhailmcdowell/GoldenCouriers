const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const csv = require('csv-parser');
const fs = require('fs');
const NotificationService = require('../services/notificationService');

module.exports = {
  // Get all packages for a customer
  getCustomerPackages: async (req, res) => {
    try {
      const { status } = req.query;
      const where = { user_id: req.user.id };

      if (status) {
        where.status = status;
      }

      const packages = await prisma.package.findMany({
        where,
        orderBy: { created_at: 'desc' },
        include: {
          pallets: {
            include: {
              pallet: true
            }
          },
          duty_fees: true
        }
      });

      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get package details
  getPackageDetails: async (req, res) => {
    try {
      const package = await prisma.package.findUnique({
        where: { package_id: parseInt(req.params.id) },
        include: {
          pallets: {
            include: {
              pallet: true
            }
          },
          duty_fees: true,
          warehouse_scan: true
        }
      });

      if (!package || package.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Package not found' });
      }

      res.json(package);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Bulk upload packages (Admin only)
  bulkUploadPackages: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const results = [];
      const errors = [];

      // Process CSV file
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          for (const row of results) {
            try {
              // Try to find user by tracking number or address identifier
              let user;
              
              // Method 1: Check if tracking number contains an address identifier
              const addressMatch = await prisma.userAddress.findFirst({
                where: {
                  unique_identifier: {
                    contains: row.TrackingNumber.substring(0, 7) // Adjust based on your identifier format
                  }
                }
              });

              if (addressMatch) {
                user = await prisma.user.findUnique({ where: { id: addressMatch.user_id } });
              }

              // Method 2: If no match, leave as unassigned (admin will handle later)
              if (!user) {
                await prisma.warehouseScan.create({
                  data: {
                    tracking_number: row.TrackingNumber,
                    carrier: row.Carrier,
                    weight_lbs: parseFloat(row.Weight),
                    dimensions: row.Dimensions,
                    operator_id: req.user.id
                  }
                });
                continue;
              }

              // Create package for matched user
              await prisma.package.create({
                data: {
                  user_id: user.id,
                  tracking_number: row.TrackingNumber,
                  carrier: row.Carrier,
                  description: row.Description,
                  weight_lbs: parseFloat(row.Weight),
                  declared_value: parseFloat(row.Value),
                  status: 'received_fl',
                  auto_matched: true,
                  match_method: addressMatch ? 'address' : 'manual'
                }
              });

              // Send notification to user
              await NotificationService.sendPackageNotification(
                user.id,
                null,
                `New package received with tracking #${row.TrackingNumber}`
              );

            } catch (error) {
              errors.push({
                trackingNumber: row.TrackingNumber,
                error: error.message
              });
            }
          }

          // Delete the uploaded file
          fs.unlinkSync(req.file.path);

          res.json({
            success: true,
            processed: results.length - errors.length,
            errors
          });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Assign package to pallet (Admin only)
  assignToPallet: async (req, res) => {
    try {
      const { packageIds, palletId, shippingMethod } = req.body;

      // Check if we need to create a new pallet
      let pallet;
      if (!palletId) {
        pallet = await prisma.pallet.create({
          data: {
            shipping_method: shippingMethod,
            departure_date: new Date(),
            created_by: req.user.id
          }
        });
      } else {
        pallet = await prisma.pallet.findUnique({
          where: { pallet_id: palletId }
        });
      }

      if (!pallet) {
        return res.status(404).json({ error: 'Pallet not found' });
      }

      // Assign packages to pallet
      for (const packageId of packageIds) {
        await prisma.packagePallet.create({
          data: {
            package_id: packageId,
            pallet_id: pallet.pallet_id,
            position: '' // You can add position logic here
          }
        });

        // Update package status
        await prisma.package.update({
          where: { package_id: packageId },
          data: { status: 'in_transit' }
        });

        // Get package to notify user
        const package = await prisma.package.findUnique({
          where: { package_id: packageId },
          include: { user: true }
        });

        if (package) {
          await NotificationService.sendPackageNotification(
            package.user_id,
            package.package_id,
            `Your package ${package.tracking_number} has been shipped to Jamaica on pallet ${pallet.pallet_id}`
          );
        }
      }

      res.json({
        success: true,
        pallet,
        message: `Packages assigned to pallet ${pallet.pallet_id}`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get unassigned packages (Admin only)
  getUnassignedPackages: async (req, res) => {
    try {
      const unassigned = await prisma.warehouseScan.findMany({
        where: {
          NOT: {
            tracking_number: {
              in: await prisma.package.findMany().then(packages => 
                packages.map(p => p.tracking_number)
              )
            }
          }
        },
        orderBy: { scan_time: 'desc' }
      });

      res.json(unassigned);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Manually assign package to user (Admin only)
  manualAssignPackage: async (req, res) => {
    try {
      const { scanId, userId } = req.body;

      // Get scan record
      const scan = await prisma.warehouseScan.findUnique({
        where: { scan_id: scanId }
      });

      if (!scan) {
        return res.status(404).json({ error: 'Scan record not found' });
      }

      // Create package
      const package = await prisma.package.create({
        data: {
          user_id: userId,
          tracking_number: scan.tracking_number,
          carrier: scan.carrier,
          weight_lbs: scan.weight_lbs,
          dimensions: scan.dimensions,
          status: 'received_fl',
          auto_matched: false,
          match_method: 'manual'
        }
      });

      // Notify user
      await NotificationService.sendPackageNotification(
        userId,
        package.package_id,
        `New package received with tracking #${scan.tracking_number}`
      );

      res.json(package);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};