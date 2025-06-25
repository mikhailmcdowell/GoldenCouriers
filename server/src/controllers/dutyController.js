const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const NotificationService = require('../services/notificationService');

// Duty calculation rates (adjust based on your business rules)
const DUTY_RATE = 0.20; // 20%
const GCT_RATE = 0.15;  // 15%
const SCL_RATE = 0.05;  // 5% (for certain items)
const HANDLING_FEE = 5.00; // Fixed handling fee

module.exports = {
  // Calculate duties for a package
  calculateDuties: async (req, res) => {
    try {
      const packageId = parseInt(req.params.id);
      
      // Get package
      const package = await prisma.package.findUnique({
        where: { package_id: packageId }
      });

      if (!package) {
        return res.status(404).json({ error: 'Package not found' });
      }

      // Check if already calculated
      const existingFee = await prisma.dutyFee.findFirst({
        where: { package_id: packageId }
      });

      if (existingFee) {
        return res.json(existingFee);
      }

      // Calculate duties (simplified example)
      const customsDuty = package.declared_value * DUTY_RATE;
      const gct = (package.declared_value + customsDuty) * GCT_RATE;
      
      // For this example, we'll assume no SCL unless it's electronics
      const hasSCL = package.description && 
        (package.description.toLowerCase().includes('phone') || 
         package.description.toLowerCase().includes('electronics'));
      const scl = hasSCL ? package.declared_value * SCL_RATE : 0;

      const total = customsDuty + gct + scl + HANDLING_FEE;

      // Create duty record
      const dutyFee = await prisma.dutyFee.create({
        data: {
          package_id: packageId,
          customs_duty: customsDuty,
          gct: gct,
          scl: scl,
          handling_fee: HANDLING_FEE,
          total: total,
          payment_status: 'unpaid'
        }
      });

      // Notify user
      await NotificationService.sendPackageNotification(
        package.user_id,
        package.package_id,
        `Duties calculated for your package ${package.tracking_number}: $${total.toFixed(2)}`
      );

      res.json(dutyFee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Process payment for duties
  processPayment: async (req, res) => {
    try {
      const { paymentMethod } = req.body;
      const packageId = parseInt(req.params.id);

      // Get duty fee
      const dutyFee = await prisma.dutyFee.findFirst({
        where: { package_id: packageId },
        include: { package: true }
      });

      if (!dutyFee) {
        return res.status(404).json({ error: 'Duty fee not found' });
      }

      // Update payment status
      const updatedFee = await prisma.dutyFee.update({
        where: { fee_id: dutyFee.fee_id },
        data: {
          payment_status: 'paid',
          paid_at: new Date(),
          payment_method: paymentMethod
        }
      });

      // Update package status
      await prisma.package.update({
        where: { package_id: packageId },
        data: { status: 'ready_for_pickup' }
      });

      // Notify user
      await NotificationService.sendPackageNotification(
        dutyFee.package.user_id,
        packageId,
        `Payment received for package ${dutyFee.package.tracking_number}. Ready for pickup!`
      );

      res.json(updatedFee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get duty fees for a customer
  getCustomerDuties: async (req, res) => {
    try {
      const { status } = req.query;
      const where = {
        package: {
          user_id: req.user.id
        }
      };

      if (status) {
        where.payment_status = status;
      }

      const duties = await prisma.dutyFee.findMany({
        where,
        include: {
          package: true
        },
        orderBy: { created_at: 'desc' }
      });

      res.json(duties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};