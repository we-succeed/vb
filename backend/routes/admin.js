const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController')


//restfullapi
router.get('/admins', adminController.getAdmins)
router.post('/admins', adminController.setAdmin) 
router.put('/admins/:id', adminController.updateAdmin) 
router.delete('/admins/:id', adminController.deleteAdmin)

module.exports = router;