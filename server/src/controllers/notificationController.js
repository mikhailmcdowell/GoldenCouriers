const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Get user notifications
  getUserNotifications: async (req, res) => {
    try {
      const notifications = await prisma.notification.findMany({
        where: { user_id: req.user.id },
        orderBy: { created_at: 'desc' },
        include: {
          package: {
            select: {
              tracking_number: true,
              status: true
            }
          }
        }
      });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mark notification as read
  markAsRead: async (req, res) => {
    try {
      const notification = await prisma.notification.update({
        where: { notification_id: parseInt(req.params.id) },
        data: { is_read: true }
      });

      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (req, res) => {
    try {
      await prisma.notification.updateMany({
        where: { user_id: req.user.id, is_read: false },
        data: { is_read: true }
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete notification
  deleteNotification: async (req, res) => {
    try {
      await prisma.notification.delete({
        where: { notification_id: parseInt(req.params.id) }
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};