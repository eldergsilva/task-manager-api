const router = require('express').Router();
const validateRequest = require('../middlewares/validateRequest');
const { register, login } = require('../controllers/authController');
const schemaUser = require('../validations/schemaCreateUsers');
const schemaLogin = require('../validations/schemaLogin');

router.post('/register', validateRequest(schemaUser), register);
router.post('/login', validateRequest(schemaLogin), login);

module.exports = router;