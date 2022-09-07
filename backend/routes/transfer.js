const express = require('express');
const router = express.Router({mergeParams: true});
const transferController = require('../controllers/transferController')

//restfullAPI

router.get('/', transferController.userTransferInfo)
router.post('/', transferController.createTransfer)



module.exports = router;