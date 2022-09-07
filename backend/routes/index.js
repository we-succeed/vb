const router = require('express').Router({mergeParams: true});
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');
const userAccountRoutes = require('./userAccount');

router.use('/auth',authRoutes);
router.use('/accounts', accountRoutes);
router.use('/users',userRoutes);
router.use('/userAccounts', userAccountRoutes)
router.use('/admin', adminRoutes);



module.exports = router; 