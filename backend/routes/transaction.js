const express = require('express');
const router = express.Router({mergeParams: true});
const transactionController = require('../controllers/transactionController')

//restfullAPI
router.get('/', transactionController.userTransactionInfo)
router.post('/', transactionController.createTransaction)



module.exports = router;