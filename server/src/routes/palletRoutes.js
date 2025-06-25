const express = require('express');
const router = express.Router();
const palletController = require('../controllers/palletController');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize('admin'), palletController.createPallet);
router.get('/:id/packages', authenticate, palletController.getPalletPackages);
router.post('/:id/ship', authenticate, authorize('admin'), palletController.shipPallet);

module.exports = router;