class userRepository{
  constructor(model) {
    this.model=model;
  }

  async create(userData) {
    return this.model.create(userData);
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }

 async findById(id) {
   return this.model.findById(id);
 }

 async findByIdWithoutPassword(id) {
   return this.model.findById(id).select('+password');
 }

 async findByEmailWithPassword(email) {
    return this.model.findOne({ email }).select('+password');
  }
}

module.exports = userRepository;
