const express = require('express');
const router = express.Router({mergeParams: true});
const userController = require('../controllers/userController')
const validateMiddleWare = require("../utils/validate");
const {validateUser} = require("../models/user");
const hashingPassword = require("../utils/hashingPassword");
const contactRoutes = require("./contact");
const middlewares = [
    validateMiddleWare(validateUser),
    hashingPassword
]

router.get('/', userController.findAllUser);
router.get('/:user_id', userController.findUserById);
router.post('/', middlewares, userController.create);
router.put('/:user_id', userController.updateUserById);
router.delete('/:user_id', userController.deleteUserById);
router.get('/:user_id/accounts', userController.getUserAccounts);
//UserContacts API
router.use('/:userId/contacts', contactRoutes);



module.exports = router;