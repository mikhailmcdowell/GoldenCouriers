const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { authenticate, authorize } = require('../middlewares/auth');

// Customer routes
router.get('/', authenticate, packageController.getCustomerPackages);
router.get('/:id', authenticate, packageController.getPackageDetails);

// Admin routes
router.post('/bulk-upload', authenticate, authorize('admin'), packageController.bulkUploadPackages);
router.post('/assign-pallet', authenticate, authorize('admin'), packageController.assignToPallet);

module.exports = router;