const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, password: password ? '[PROVIDED]' : '[MISSING]' });
  
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

const resetTestUser = async (req, res) => {
  try {
    console.log('Starting user reset...');
    
    // Delete existing users
    const deleteResult = await prisma.users.deleteMany({
      where: {
        email: {
          in: ['customer@example.com', 'john@example.com']
        }
      }
    });
    console.log(`Deleted ${deleteResult.count} existing users`);
    
    // Create fresh user with properly hashed password
    const hashedPassword = await bcrypt.hash('userpassword', 10);
    console.log('Password hashed successfully');
    
    const user = await prisma.users.create({
      data: {
        first_name: 'Customer',
        last_name: 'User',
        email: 'customer@example.com',
        password: hashedPassword,
        phone: '18765551234',
        trn: '123456789',
        account_balance: 0.00,
        role: 'customer' // Make sure to include role if it's required
      }
    });
    
    console.log('New user created:', user.email);
    
    res.json({ 
      message: 'User reset successfully',
      instructions: {
        email: 'customer@example.com',
        password: 'userpassword',
        note: 'You can now login with these credentials'
      }
    });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ 
      error: 'Reset failed', 
      details: error.message 
    });
  }
};

module.exports = { login, logout, resetTestUser };





/*const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, password: password ? '[PROVIDED]' : '[MISSING]' });
  
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

module.exports = { login, logout };*/

/*const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const twilio = require('twilio');
const NotificationService = require('../services/notificationService');

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: 'customer' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = {
  // Customer registration
  register: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, password, trn } = req.body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          phone,
          password: hashedPassword,
          trn,
          account_balance: 0.00
        }
      });

      // Generate unique address identifier (e.g., ETEL1507)
      const uniqueIdentifier = `${last_name.substring(0, 4).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;

      // Create US warehouse address
      await prisma.userAddress.create({
        data: {
          user_id: user.id,
          unique_identifier: uniqueIdentifier,
          contact_name: `${first_name} ${last_name}`,
          address_line1: '1234 Miami St',
          city: 'Lauderdale Lakes',
          state: 'FL',
          zip_code: '33319',
          is_active: true
        }
      });

      // Generate token
      const token = generateToken(user);

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Customer login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken(user);

      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Password reset request
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate reset token (simple 6-digit code for SMS)
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const resetToken = jwt.sign(
        { id: user.id, code: resetCode },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      // Save to database (you'd need a password_resets table)
      // For now we'll just send the SMS

      // Send SMS with reset code
      await twilioClient.messages.create({
        body: `Your GoldenCourier password reset code is: ${resetCode}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone
      });

      res.json({ message: 'Reset code sent to your phone' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Password reset confirmation
  resetPassword: async (req, res) => {
    try {
      const { code, newPassword } = req.body;
      const { token } = req.params;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.code !== code) {
        return res.status(400).json({ error: 'Invalid reset code' });
      }

      // Find user
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};*/