const router = require('express').Router();
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');
const txRoutes = require('./transaction');
const contactRoutes = require('./contact');

router.use('/accounts', accountRoutes);
router.use('/users', userRoutes);
router.use('/auth',authRoutes);
router.use('/tx', txRoutes)
router.use('/contacts', contactRoutes);
router.use('/admin', adminRoutes);


module.exports = router; 