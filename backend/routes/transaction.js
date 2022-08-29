const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController')

//restfullAPI

router.get('/tx/:userAccountId', transactionController.userTransactionInfo)
router.post('/tx', transactionController.createTransaction)



module.exports = router;