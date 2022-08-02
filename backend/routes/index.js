const router = require('express').Router();
const todoRoutes = require('./todo');
const adminRoutes = require('./admin');
const userRoutes = require('./user');

router.use('/api', todoRoutes);
router.use('/api', adminRoutes);
router.use('/api', userRoutes);


module.exports = router; 