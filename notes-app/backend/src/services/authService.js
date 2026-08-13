const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(userRepository, tokenBlacklistRepository) {
    this.userRepository = userRepository;
    this.tokenBlacklistRepository = tokenBlacklistRepository;
  }


  async signup({ name, email, password }) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
        throw new ApiError(400, 'Email is already registered');
      }

    const user = await this.userRepository.create({ name, email, password });

    const token = generateToken(user._id);

    return {
         user: {
           id: user._id,
           name: user.name,
           email: user.email,
         },
         token,
       };
  }


  async login({ email, password }) {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
       throw new ApiError(401, 'Invalid email or password');
     }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid email or password');
      }

    const token = generateToken(user._id);

       return {
         user: {
           id: user._id,
           name: user.name,
           email: user.email,
         },
         token,
       };

  }
  async logout(token) {
     const decoded = jwt.decode(token);
     const expiresAt = new Date(decoded.exp * 1000);

     await this.tokenBlacklistRepository.add(token, expiresAt);
   }
}


module.exports = AuthService;
