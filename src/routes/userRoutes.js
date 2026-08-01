const routes = require('express').Router();
const validateRequest = require('../middlewares/validateRequest');
const { register } = require('../controllers/User');
const schemaUser = require('../validations/schemaCreateUsers'); // sem chaves

routes.post('/', validateRequest(schemaUser), register);

module.exports = routes;