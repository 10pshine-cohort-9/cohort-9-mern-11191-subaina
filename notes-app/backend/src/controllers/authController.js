const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken');
const UserRepository = require('../repositories/userRepository');
const TokenBlacklistRepository = require('../repositories/tokenBlacklistRepository');
const AuthService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');


const userRepository = new UserRepository(User);
const tokenBlacklistRepository = new TokenBlacklistRepository(BlacklistedToken);
const authService = new AuthService(userRepository, tokenBlacklistRepository);


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

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.token);

  res.status(200).json({ message: 'Logged out successfully' });
})

module.exports = { signup, login, getMe, logout};
