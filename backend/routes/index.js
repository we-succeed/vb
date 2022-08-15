const router = require('express').Router();
const todoRoutes = require('./todo');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');

router.use('/api', todoRoutes);
router.use('/api', adminRoutes);
router.use('/api', userRoutes);
router.use('/api/admin', accountRoutes);
router.use('/auth',authRoutes);


module.exports = router; 