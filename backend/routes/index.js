const router = require('express').Router();
const todoRoutes = require('./todo');
const adminRoutes = require('./admin');

router.use('/api', todoRoutes);
router.use('/api', adminRoutes);

module.exports = router; 