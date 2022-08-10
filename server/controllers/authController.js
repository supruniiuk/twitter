require('dotenv').config();
const ApiError = require('../errors/apiError');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const generateToken = (user) => {
  return jwt.sign(
      {
        id: user.id,
        email: user.email,
        created_date: user.created_date,
      },
      JWT_KEY,
      {expiresIn: '24h'},
  );
};

class AuthController {
  async register(req, res, next) {
    const {email, password, name, description, username, birthDate, isPrivate} = req.body;
    console.log(email, password)

    try {
      const checkUser = await User.findOne({email: email});

      if (checkUser) {
        return next(ApiError.badRequest(`User already exists`));
      }

      const passwordHash = await bcrypt.hash(password, 7);

      const user = new User({email, password: passwordHash, name, description, username, birthDate, isPrivate});
      await user.save();

      res.json({
        message: 'Profile created successfully',
      });
    } catch (e) {
      console.log(e.message);
      return next(ApiError.internal(`Server error`));
    }
  }

  async login(req, res, next) {
    const {email, password} = req.body;

    try {
      const user = await User.findOne({email: email});
      if (!user) {
        return next(ApiError.badRequest('User not found'));
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest('Wrong password'));
      }

      const token = generateToken(user);
      return res.json({jwt_token: token});
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }
}

module.exports = new AuthController();