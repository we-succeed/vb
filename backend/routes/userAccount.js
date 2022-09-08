const router = require('express').Router({mergeParams: true});

const transferRoutes = require("./transfer");
const eTransferRoutes = require('./eTransfer');

router.use('/:userAccountId/transfer', transferRoutes)
router.use('/:userAccountId/eTransfer', eTransferRoutes);

module.exports = router;