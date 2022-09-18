const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController')
const userAccountController = require("../controllers/userAccountController");
const verifyToken = require("../utils/verifyToken");

//selling backing account
router.get('/', accountController.findAccountAll)
router.get('/:accountId', accountController.findAccountById)
router.post('/', accountController.createAccount)
router.put('/:accountId', accountController.updateAccount)
router.delete('/:accountId', accountController.deleteAccount)

//open user account
router.post('/:accountId/open', verifyToken, userAccountController.saveUserAccount)

module.exports = router;