const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController')

//restfullAPI

router.get('/transfer/:userAccountId', transferController.userTransferInfo)
router.post('/transfer', transferController.createTransfer)



module.exports = router;