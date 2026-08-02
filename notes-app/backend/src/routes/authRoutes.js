const express = require('express');
const protect = require('../middleware/authMiddleware');
const { signup, login, getMe } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../validators/authValidators');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
