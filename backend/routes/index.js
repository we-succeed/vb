const router = require('express').Router();
const todoRoutes = require('./todo');

router.use('/api', todoRoutes);

module.exports = router;