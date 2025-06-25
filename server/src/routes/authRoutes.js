const express = require('express'); 
const router = express.Router(); 
const { login, logout, resetTestUser } = require('../controllers/authController');

router.post('/login', login); 
router.post('/logout', logout);
router.post('/reset-test-user', resetTestUser);

module.exports = router;







/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);

export default router;*/


/*router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;*/