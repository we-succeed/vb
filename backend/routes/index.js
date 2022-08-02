const router = require('express').Router();
const todoRoutes = require('./todo');
const userRoutes = require('./user');
const accountRoutes = require('./account')

router.use('/api', todoRoutes);
router.use('/api', userRoutes);
router.use('/api/admin', accountRoutes);


module.exports = router;