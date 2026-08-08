const router = require('express').Router({ mergeParams: true });
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { createTask } = require('../controllers/taskController');
const schemaCreateTask = require('../validations/schemaCreateTask');

router.post('/', authMiddleware, validateRequest(schemaCreateTask), createTask);

module.exports = router;