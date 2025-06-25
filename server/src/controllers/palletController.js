const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const NotificationService = require('../services/notificationService');
const PDFDocument = require('pdfkit');

module.exports = {
  // Create new pallet
  createPallet: async (req, res) => {
    try {
      const { shippingMethod, departureDate } = req.body;

      const pallet = await prisma.pallet.create({
        data: {
          shipping_method: shippingMethod,
          departure_date: new Date(departureDate),
          created_by: req.user.id
        }
      });

      res.status(201).json(pallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get packages in a pallet
  getPalletPackages: async (req, res) => {
    try {
      const pallet = await prisma.pallet.findUnique({
        where: { pallet_id: parseInt(req.params.id) },
        include: {
          packages: {
            include: {
              package: {
                include: {
                  user: true
                }
              }
            }
          }
        }
      });

      if (!pallet) {
        return res.status(404).json({ error: 'Pallet not found' });
      }

      res.json(pallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mark pallet as shipped
  shipPallet: async (req, res) => {
    try {
      const pallet = await prisma.pallet.update({
        where: { pallet_id: parseInt(req.params.id) },
        data: {
          departure_date: new Date(),
          customs_status: 'pending'
        }
      });

      // Update all packages in pallet to "in_transit"
      await prisma.package.updateMany({
        where: {
          package_pallet: {
            some: { pallet_id: pallet.pallet_id }
          }
        },
        data: { status: 'in_transit' }
      });

      res.json(pallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mark pallet as arrived in Jamaica
  arrivePallet: async (req, res) => {
    try {
      const pallet = await prisma.pallet.update({
        where: { pallet_id: parseInt(req.params.id) },
        data: {
          arrival_date: new Date(),
          customs_status: 'pending'
        }
      });

      res.json(pallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update pallet customs status
  updateCustomsStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const pallet = await prisma.pallet.update({
        where: { pallet_id: parseInt(req.params.id) },
        data: { customs_status: status }
      });

      // If cleared, update packages
      if (status === 'cleared') {
        await prisma.package.updateMany({
          where: {
            package_pallet: {
              some: { pallet_id: pallet.pallet_id }
            }
          },
          data: { status: 'customs_cleared' }
        });

        // Notify users
        const packages = await prisma.package.findMany({
          where: {
            package_pallet: {
              some: { pallet_id: pallet.pallet_id }
            }
          },
          include: { user: true }
        });

        for (const pkg of packages) {
          await NotificationService.sendPackageNotification(
            pkg.user_id,
            pkg.package_id,
            `Your package ${pkg.tracking_number} has cleared customs and is ready for pickup`
          );
        }
      }

      res.json(pallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Generate pallet manifest (PDF)
  generateManifest: async (req, res) => {
    try {
      const pallet = await prisma.pallet.findUnique({
        where: { pallet_id: parseInt(req.params.id) },
        include: {
          packages: {
            include: {
              package: {
                include: {
                  user: true,
                  duty_fees: true
                }
              }
            }
          }
        }
      });

      if (!pallet) {
        return res.status(404).json({ error: 'Pallet not found' });
      }

      // Create PDF
      const doc = new PDFDocument();
      const filename = `manifest-pallet-${pallet.pallet_id}.pdf`;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      doc.pipe(res);

      // PDF content
      doc.fontSize(20).text('GoldenCourier Shipping Manifest', { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`Pallet ID: ${pallet.pallet_id}`);
      doc.text(`Shipping Method: ${pallet.shipping_method.toUpperCase()}`);
      doc.text(`Departure Date: ${pallet.departure_date.toLocaleDateString()}`);
      if (pallet.arrival_date) {
        doc.text(`Arrival Date: ${pallet.arrival_date.toLocaleDateString()}`);
      }
      doc.moveDown();

      // Packages table
      doc.fontSize(12).text('Packages:', { underline: true });
      doc.moveDown(0.5);

      // Table header
      doc.font('Helvetica-Bold');
      doc.text('Tracking #', 50, doc.y);
      doc.text('Customer', 200, doc.y);
      doc.text('Weight', 350, doc.y);
      doc.text('Value', 420, doc.y);
      doc.moveDown();

      doc.font('Helvetica');
      let y = doc.y;
      
      // Table rows
      for (const item of pallet.packages) {
        const pkg = item.package;
        doc.text(pkg.tracking_number, 50, y);
        doc.text(`${pkg.user.first_name} ${pkg.user.last_name}`, 200, y);
        doc.text(`${pkg.weight_lbs} lbs`, 350, y);
        doc.text(`$${pkg.declared_value || '0.00'}`, 420, y);
        y += 25;
        
        if (y > 700) { // New page if we're at the bottom
          doc.addPage();
          y = 50;
        }
      }

      doc.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};