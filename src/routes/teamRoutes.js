const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createTeam, listTeams, deleteTeam, updateTeam} = require('../controllers/teamController');
const validateRequest = require('../middlewares/validateRequest');
const schemaCreateTeam=require('../validations/schemaCreateTeam') 

router.post('/', authMiddleware, validateRequest(schemaCreateTeam), createTeam);
router.get('/', authMiddleware, listTeams);
router.delete('/:id', authMiddleware, deleteTeam);
router.patch('/:id', authMiddleware, updateTeam);
module.exports = router;