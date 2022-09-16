const express = require('express');
const router = express.Router({mergeParams: true});
const eTransferController = require('../controllers/eTransferController')
const verifyToken = require("../utils/verifyToken");

//restfullAPI

router.get('/', eTransferController.getEtransfers)
router.post('/', verifyToken, eTransferController.addEtransfer)



module.exports = router;