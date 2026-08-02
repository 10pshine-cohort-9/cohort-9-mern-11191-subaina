const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
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
}


module.exports = AuthService;
