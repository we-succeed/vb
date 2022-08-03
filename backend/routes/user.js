const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/users', userController.findAll)
router.get('/users/:user_id', userController.findUserById)
router.post('/users', userController.create)
router.delete('/users/:user_id', userController.deleteUserById)
router.put('/users/:user_id', userController.updateUserById)


module.exports = router;