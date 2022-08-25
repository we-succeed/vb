const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const validateMiddleWare = require("../middleware/validate");
const {validateUser} = require("../models/user");
const hashingPassword = require("../middleware/hashingPassword");
const accountController = require("../controllers/accountController");
const middlewares = [
    validateMiddleWare(validateUser),
    hashingPassword
]

router.get('/users', userController.findAllUser)
router.get('/users/:user_id', userController.findUserById)
router.post('/users', middlewares, userController.create)
router.put('/users/:user_id', userController.updateUserById)
router.delete('/users/:user_id', userController.deleteUserById)


router.get('/users/:user_id/accounts', userController.getUserAccounts);
router.get('/users/:user_id/accounts/:account_id', userController.getUserAccounts);

router.get('/accounts', accountController.findAccountItemAll);
router.post('/accounts/:account_id', accountController.userAccountInfo);
router.post('/accounts/:account_id/open', accountController.openUserAccount)

router.get('/users/:user_id/txs', userController.getUserAccounts);

module.exports = router;