const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new UnauthorizedError('Необходима авторизация'));

  jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', (err, decoded) => {
    if (err) return next(new UnauthorizedError('Необходима авторизация'));

    req.user = decoded;
    return req.user;
  });

  return next();
};
