const User = require('../models/User');
const UserRepository = require('../repositories/userRepository');
const AuthService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await authService.signup({ name, email, password });

  res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.status(200).json(result);
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = { signup, login, getMe };
