const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Admin dashboard stats
  getAdminDashboard: async (req, res) => {
    try {
      const [
        totalPackages,
        packagesInTransit,
        packagesReadyForPickup,
        totalCustomers,
        recentPackages,
        recentPallets
      ] = await Promise.all([
        prisma.package.count(),
        prisma.package.count({ where: { status: 'in_transit' } }),
        prisma.package.count({ where: { status: 'ready_for_pickup' } }),
        prisma.user.count(),
        prisma.package.findMany({
          orderBy: { created_at: 'desc' },
          take: 10,
          include: { user: true }
        }),
        prisma.pallet.findMany({
          orderBy: { created_at: 'desc' },
          take: 5,
          include: {
            _count: {
              select: { packages: true }
            }
          }
        })
      ]);

      res.json({
        totalPackages,
        packagesInTransit,
        packagesReadyForPickup,
        totalCustomers,
        recentPackages,
        recentPallets
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Customer dashboard stats
  getCustomerDashboard: async (req, res) => {
    try {
      const [
        totalPackages,
        packagesInTransit,
        packagesReadyForPickup,
        recentPackages,
        unpaidDuties
      ] = await Promise.all([
        prisma.package.count({ where: { user_id: req.user.id } }),
        prisma.package.count({ 
          where: { 
            user_id: req.user.id,
            status: 'in_transit'
          }
        }),
        prisma.package.count({ 
          where: { 
            user_id: req.user.id,
            status: 'ready_for_pickup'
          }
        }),
        prisma.package.findMany({
          where: { user_id: req.user.id },
          orderBy: { created_at: 'desc' },
          take: 5
        }),
        prisma.dutyFee.findMany({
          where: { 
            package: { user_id: req.user.id },
            payment_status: 'unpaid'
          },
          include: { package: true }
        })
      ]);

      res.json({
        totalPackages,
        packagesInTransit,
        packagesReadyForPickup,
        recentPackages,
        unpaidDuties
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};