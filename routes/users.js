const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { updateUserValidator } = require('../validations/validations');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidator, updateUserInfo);

module.exports = router;
