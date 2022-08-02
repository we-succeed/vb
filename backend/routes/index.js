const router = require('express').Router();
const todoRoutes = require('./todo');
const userRoutes = require('./user');

router.use('/api', todoRoutes);
router.use('/api', userRoutes);


module.exports = router;