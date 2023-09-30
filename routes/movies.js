const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../validations/validations');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:_id', deleteMovieValidator, deleteMovie);

module.exports = router;
