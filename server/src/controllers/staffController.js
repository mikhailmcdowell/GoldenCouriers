const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT token for staff
const generateStaffToken = (staff) => {
  return jwt.sign(
    { id: staff.staff_id, username: staff.username, role: staff.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = {
  // Staff login
  staffLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find staff member
      const staff = await prisma.staff.findUnique({
        where: { username }
      });

      if (!staff) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, staff.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update last login
      await prisma.staff.update({
        where: { staff_id: staff.staff_id },
        data: { last_login: new Date() }
      });

      // Generate token
      const token = generateStaffToken(staff);

      res.json({ staff, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all staff (Admin only)
  getAllStaff: async (req, res) => {
    try {
      const staff = await prisma.staff.findMany({
        orderBy: { full_name: 'asc' }
      });

      // Remove passwords
      const sanitizedStaff = staff.map(s => {
        const { password, ...rest } = s;
        return rest;
      });

      res.json(sanitizedStaff);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new staff member (Admin only)
  createStaff: async (req, res) => {
    try {
      const { username, password, role, full_name } = req.body;

      // Check if username exists
      const existingStaff = await prisma.staff.findUnique({
        where: { username }
      });

      if (existingStaff) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create staff
      const staff = await prisma.staff.create({
        data: {
          username,
          password: hashedPassword,
          role,
          full_name,
          is_active: true
        }
      });

      // Remove password
      const { password: _, ...staffData } = staff;

      res.status(201).json(staffData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update staff member (Admin only)
  updateStaff: async (req, res) => {
    try {
      const { role, full_name, is_active } = req.body;

      const staff = await prisma.staff.update({
        where: { staff_id: parseInt(req.params.id) },
        data: {
          role,
          full_name,
          is_active
        }
      });

      // Remove password
      const { password, ...staffData } = staff;

      res.json(staffData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};