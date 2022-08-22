const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController')

//restfullAPI
router.get('/accounts', accountController.findAccountAll)
router.get('/accounts/:account_id', accountController.findAccountById)
router.post('/accounts', accountController.createAccount)
router.put('/accounts/:account_id', accountController.updateAccount)
router.delete('/accounts/:account_id', accountController.deleteAccount)

module.exports = router;