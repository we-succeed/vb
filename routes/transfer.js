const express = require('express');
const router = express.Router({mergeParams: true});
const transactionController = require('../controllers/transferController')
const verifyToken = require("../utils/verifyToken");

//restfullAPI
router.get('/', transactionController.getUserTransfers)
router.post('/', verifyToken, transactionController.addTransfer)



module.exports = router;