const router = require('express').Router();

const { register, login, exit } = require('../controllers/users');
const { registerValidator, loginValidator } = require('../validations/validations');
const auth = require('../middlewares/auth');

router.post('/signup', registerValidator, register);
router.post('/signin', loginValidator, login);
router.post('/signout', exit);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', require('../middlewares/notfound'));

module.exports = router;
