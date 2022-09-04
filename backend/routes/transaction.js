const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController')

//restfullAPI
router.get('/:userAccountId', transactionController.userTransactionInfo)
router.post('/', transactionController.createTransaction)



module.exports = router;