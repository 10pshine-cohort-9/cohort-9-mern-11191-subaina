class TokenBlacklistRepository {
  constructor(model) {
    this.model = model;
  }

  async add(token, expiresAt) {
    return this.model.create({ token, expiresAt });
  }

  async isBlacklisted(token) {
    const found = await this.model.findOne({ token });
    return !!found;
  }
}

module.exports = TokenBlacklistRepository;
