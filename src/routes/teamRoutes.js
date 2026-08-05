const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createTeam} = require('../controllers/teamController');
const validateRequest = require('../middlewares/validateRequest');
const schemaCreateTeam=require('../validations/schemaCreateTeam') 

router.post('/create', authMiddleware,validateRequest(schemaCreateTeam),createTeam);
 

module.exports = router;