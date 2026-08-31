const ApiError = require('../utils/ApiError');

class userRepository{
  constructor(model) {
    this.model=model;
  }

  async create(userData) {
    return this.model.create(userData);
  }

  async findByEmail(email) {
    if (typeof email !== 'string') {
      throw new ApiError(400, 'Invalid email format');
    }
    return this.model.findOne({ email: String(email) });
  }

 async findById(id) {
   return this.model.findById(id);
 }

 async findByIdWithoutPassword(id) {
   return this.model.findById(id).select('+password');
 }

 async findByEmailWithPassword(email) {
    if (typeof email !== 'string') {
      throw new ApiError(400, 'Invalid email format');
    }
    return this.model.findOne({ email: String(email) }).select('+password');
  }
}

module.exports = userRepository;
