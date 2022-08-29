const router = require('express').Router();
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');
const txRoutes = require('./transaction');
const contactRoutes = require('./contact');
const transferRouters = require('./transfer');


router.use('/api', adminRoutes);
router.use('/api', userRoutes);
router.use('/api/admin', accountRoutes);
router.use('/auth',authRoutes);
router.use('/api', txRoutes)
router.use('/api', contactRoutes);
router.use('/api', transferRouters)


module.exports = router; 