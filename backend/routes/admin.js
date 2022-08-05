const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController')
const {validateAdminUser} = require("../models/admin");
const validateMiddleWare = require("../middleware/validate")
const hashing = require("../middleware/hashing")


//restfullapi
router.get('/admins', adminController.getAdmins)
router.post('/admins',[validateMiddleWare(validateAdminUser), hashing], adminController.createAdmin)
router.put('/admins/:id', adminController.updateAdmin) 
router.delete('/admins/:id', adminController.deleteAdmin)

module.exports = router;