const router = require('express').Router();
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const accountRoutes = require('./account')
const authRoutes = require('./auth');
const txRoutes = require('./transaction');
<<<<<<< Updated upstream
const contactRoutes = require('./contact');
=======
const transferRouters = require('./transfer');
>>>>>>> Stashed changes

router.use('/api', adminRoutes);
router.use('/api', userRoutes);
router.use('/api/admin', accountRoutes);
router.use('/auth',authRoutes);
router.use('/api', txRoutes)
<<<<<<< Updated upstream
router.use('/api', contactRoutes);
=======
router.use('/api', transferRouters)

>>>>>>> Stashed changes

module.exports = router; 