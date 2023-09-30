const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const Users = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../config');

const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Users.create({ email, password: passwordHash, name });
    res.status(201).send({ name: user.name, email: user.email });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else if (err.code === 11000) {
      next(new ConflictError('Данный email используется'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUserByData(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'key-word',
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
      .status(200).send({ message: 'Пользователь авторизировался' });
  } catch (err) {
    next(err);
  }
};

const exit = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Осуществлён выход' });
  } catch (err) {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id).orFail();
    res.status(200).send({ user });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь не найден'));
    } else {
      next(err);
    }
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    ).orFail();
    res.status(200).send({ user });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь не найден'));
    } else if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else if (err.code === 11000) {
      next(new ConflictError('Данный email используется'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  register, login, exit, getUserInfo, updateUserInfo,
};