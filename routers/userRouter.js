const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
//const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');


//Birden Fazla Middleware KUllanımı...
//router.get('/', [authMiddleware, adminMiddleware], userController.allUserForAdmin);
router.get('/', authMiddleware, userController.allUserForAdmin);
router.get('/me', authMiddleware, userController.meInfo);
router.get('/:id', userController.getSingleUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.post('/login', userController.login);


module.exports = router;