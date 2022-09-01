const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController')
const userAccountController = require("../controllers/userAccountController");

//selling backing account
router.get('/', accountController.findAccountAll)
router.get('/:account_id', accountController.findAccountById)
router.post('/', accountController.createAccount)
router.put('/:account_id', accountController.updateAccount)
router.delete('/:account_id', accountController.deleteAccount)

//open user account
router.post('/:account_id/open',userAccountController.saveUserAccount)

module.exports = router;