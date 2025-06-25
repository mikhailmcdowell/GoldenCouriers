const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Sample shipping rates (replace with your actual rates)
const SHIPPING_RATES = {
  air: {
    base: 5.00,      // base fee per package
    perPound: 2.50,  // per pound rate
    min: 10.00       // minimum charge
  },
  sea: {
    base: 3.00,
    perPound: 1.75,
    min: 8.00
  }
};

// Sample duty rates (Jamaica specific)
const DUTY_RATES = {
  standard: 0.20,    // 20%
  electronics: 0.25, // 25%
  clothing: 0.15     // 15%
};

module.exports = {
  // Calculate shipping cost estimate
  calculateShipping: async (req, res) => {
    try {
      const { weight, method, declaredValue } = req.body;
      
      if (!['air', 'sea'].includes(method)) {
        return res.status(400).json({ error: 'Invalid shipping method' });
      }

      const rates = SHIPPING_RATES[method];
      let shippingCost = rates.base + (weight * rates.perPound);
      shippingCost = Math.max(shippingCost, rates.min);

      // Calculate estimated duties (simplified)
      let dutyRate = DUTY_RATES.standard;
      if (declaredValue > 50) {
        dutyRate = DUTY_RATES.electronics; // Just an example
      }

      const estimatedDuty = declaredValue * dutyRate;
      const gct = (declaredValue + estimatedDuty) * 0.15; // 15% GCT

      res.json({
        shippingCost,
        estimatedDuty,
        gct,
        handlingFee: 5.00,
        total: shippingCost + estimatedDuty + gct + 5.00
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all shipping rates (Admin only)
  getShippingRates: async (req, res) => {
    try {
      // In a real app, you'd get these from database
      res.json(SHIPPING_RATES);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update shipping rates (Admin only)
  updateShippingRates: async (req, res) => {
    try {
      const { air, sea } = req.body;

      // In a real app, you'd save these to database
      // This is just a mock implementation
      if (air) {
        SHIPPING_RATES.air = { ...SHIPPING_RATES.air, ...air };
      }
      if (sea) {
        SHIPPING_RATES.sea = { ...SHIPPING_RATES.sea, ...sea };
      }

      res.json(SHIPPING_RATES);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};