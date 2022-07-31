const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../middleware/auth')

//restfullapi
router.get('/admins', adminController.findAll)
router.post('/admins', adminController.create)
router.delete('/admins/:id', auth, adminController.deleteById)

module.exports = router;