const router = require('express').Router({mergeParams: true});
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');
const userAccountRoutes = require('./userAccount');

router.use('/api/auth',authRoutes);
router.use('/api/accounts', accountRoutes);
router.use('/api/users',userRoutes);
router.use('/api/userAccounts',  userAccountRoutes)
router.use('/api/admin', adminRoutes);



module.exports = router; 