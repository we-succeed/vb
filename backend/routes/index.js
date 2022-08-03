const router = require('express').Router();
const todoRoutes = require('./todo');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');

router.use('/api', todoRoutes);
router.use('/api', userRoutes);
router.use('/api/admin', accountRoutes);
router.use('/login',authRoutes);


module.exports = router;