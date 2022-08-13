const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const validateMiddleWare = require("../middleware/validate");
const {validateUser} = require("../models/user");
const hashingPassword = require("../middleware/hashingPassword");
const middlewares = [
    validateMiddleWare(validateUser),
    hashingPassword
]

router.get('/users', userController.findAll)
router.get('/users/:user_id', userController.findUserById)
router.post('/users', middlewares, userController.create)
router.delete('/users/:user_id', userController.deleteUserById)
router.put('/users/:user_id', userController.updateUserById)


module.exports = router;