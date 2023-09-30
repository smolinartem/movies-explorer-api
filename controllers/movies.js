const { Error } = require('mongoose');
const Movies = require('../models/movie');

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('../constants');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movies.find({});
    res.status(HTTP_STATUS_OK).send({ movies });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { body } = req;
    const owner = req.user._id;
    const movie = await Movies.create({ ...body, owner });
    res.status(HTTP_STATUS_CREATED).send({ movie });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movies.findById(req.params._id).orFail();
    if (!movie.owner.equals(req.user._id)) {
      throw new ForbiddenError('Нельзя удалять фильмы других пользователей');
    }
    movie.deleteOne();
    res.status(HTTP_STATUS_OK).send({ message: 'Фильм удалён' });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Фильм не найден'));
    } else if (err instanceof Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
