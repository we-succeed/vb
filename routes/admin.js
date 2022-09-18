const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController')

const validateMiddleWare = require("../utils/validate");
const {validateUser} = require("../models/user");
const hashingPassword = require("../utils/hashingPassword");
const accountRoutes = require("./account");
const userRoutes = require("./user");


const middlewares = [
    validateMiddleWare(validateUser),
    hashingPassword
]
//AdminAPI
router.get('/', adminController.getAdmins)
router.post('/', middlewares, adminController.createAdmin)
router.put('/:adminId', adminController.updateAdmin)
router.delete('/:adminId', adminController.deleteAdmin)

router.use('/accounts', accountRoutes)
router.use('/users', userRoutes)

module.exports = router;