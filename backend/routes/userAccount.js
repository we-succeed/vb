const router = require('express').Router({mergeParams: true});

const txRoutes = require('./transaction');
const transferRoutes = require("./transfer");

router.use('/:userAccountId/tx', txRoutes)
router.use('/:userAccountId/transfer', transferRoutes);

module.exports = router;