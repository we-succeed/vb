const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController')
const validateMiddleWare = require("../middleware/validate");
const {validateUser} = require("../models/user");
const hashingPassword = require("../middleware/hashingPassword");
const middlewares = [
    validateMiddleWare(validateUser),
    hashingPassword
]
//restfullapi
router.get('/admins', adminController.getAdmins)
router.post('/admins',middlewares, adminController.createAdmin)
router.put('/admins/:id', adminController.updateAdmin) 
router.delete('/admins/:id', adminController.deleteAdmin)

module.exports = router;