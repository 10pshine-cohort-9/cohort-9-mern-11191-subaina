const { expect } = require('chai');
const AuthService = require('../../src/services/authService');

describe('AuthService', () => {
  describe('signup', () => {
    it('should throw an error if email is already registered', async () => {
      const fakeUserRepository = {
        findByEmail: async () => ({ _id: '123', email: 'test@test.com' }),
      };

      const authService = new AuthService(fakeUserRepository);

      try {
        await authService.signup({
          name: 'Test',
          email: 'test@test.com',
          password: 'password123',
        });
        throw new Error('Expected signup to throw, but it did not');
      } catch (error) {
        expect(error.message).to.equal('Email is already registered');
        expect(error.statusCode).to.equal(400);
      }
    });

    it('should create a new user and return user data with a token', async () => {
      const fakeUserRepository = {
        findByEmail: async () => null,
        create: async (userData) => ({
          _id: 'abc123',
          name: userData.name,
          email: userData.email,
        }),
      };

      const authService = new AuthService(fakeUserRepository, {});
      const result = await authService.signup({
        name: 'Subaina',
        email: 'subaina@test.com',
        password: 'password123',
      });

      expect(result).to.have.property('user');
      expect(result).to.have.property('token');

      expect(result.user.name).to.equal('Subaina');
      expect(result.user.email).to.equal('subaina@test.com');
      expect(result.user).to.not.have.property('password');

      expect(result.token).to.be.a('string');
      expect(result.token.length).to.be.greaterThan(0);
    });
  });
});
