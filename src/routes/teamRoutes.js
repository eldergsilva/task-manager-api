// routes/teamRoutes.js
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { createTeam, listTeams, updateTeam, deleteTeam } = require('../controllers/teamController');
const schemaCreateTeam = require('../validations/schemaCreateTeam');

const taskRoutes = require('./taskRoutes'); // <- importa as rotas de task

router.post('/', authMiddleware, validateRequest(schemaCreateTeam), createTeam);
router.get('/', authMiddleware, listTeams);
router.patch('/:id', authMiddleware, updateTeam);
router.delete('/:id', authMiddleware, deleteTeam);

router.use('/:teamId/tasks', taskRoutes); // <- monta as rotas de task dentro de /teams/:teamId/tasks

module.exports = router;