const router = require('express').Router();
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');
const txRoutes = require('./transaction');

router.use('/api', adminRoutes);
router.use('/api', userRoutes);
router.use('/api/admin', accountRoutes);
router.use('/auth',authRoutes);
router.use('/api', txRoutes)


module.exports = router; 