const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED, // 201
  HTTP_STATUS_BAD_REQUEST, // 400
  HTTP_STATUS_UNAUTHORIZED, // 401
  HTTP_STATUS_FORBIDDEN, // 403
  HTTP_STATUS_NOT_FOUND, // 404
  HTTP_STATUS_CONFLICT, // 409
  HTTP_STATUS_INTERNAL_SERVER_ERROR, // 500
} = require('http2').constants;

const DUBLICATE_CODE = 11000;

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/;

const MESSAGES = {
  email_conflict: 'Данный email используется',
  user_auth: 'Пользователь авторизировался',
  user_exit: 'Осуществлён выход',
  user_notfound: 'Пользователь не найден',
  movie_forbidden: 'Нельзя удалять фильмы других пользователей',
  movie_delete: 'Фильм удалён',
  movie_notfound: 'Фильм не найден',
};

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  DUBLICATE_CODE,
  URL_REGEX,
  MESSAGES,
};
