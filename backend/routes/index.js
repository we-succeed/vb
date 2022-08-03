const router = require('express').Router();
const todoRoutes = require('./todo');
const userRoutes = require('./user');
const authRoutes = require('./auth');
router.use('/api', todoRoutes);
router.use('/api', userRoutes);
router.use('/login',authRoutes);


module.exports = router;