const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { listUsers, deleteUser ,listLoggedUser,updateUser} = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const schemaUpdateUser = require('../validations/schemaUpdateUser')

router.get('/', authMiddleware, listUsers);
router.get('/me', authMiddleware, listLoggedUser);
router.delete('/:id', authMiddleware, deleteUser);
router.patch('/me', authMiddleware, validateRequest(schemaUpdateUser), updateUser)

module.exports = router;