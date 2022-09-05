const express = require('express'); 
const router = express.Router();
const adminController = require('../controllers/adminController')
const accountCoroller = require("../controllers/accountController");

const validateMiddleWare = require("../utils/validate");
const {validateUser} = require("../models/user");
const hashingPassword = require("../utils/hashingPassword");
const userController = require("../controllers/userController");

const middlewares = [
    validateMiddleWare(validateUser),
    hashingPassword
]
//AdminAPI
router.get('/', adminController.getAdmins)
router.post('/', middlewares, adminController.createAdmin)
router.put('/:adminId', adminController.updateAdmin)
router.delete('/:adminId', adminController.deleteAdmin)

router.get('/accounts', accountCoroller.findAccountAll)
router.get('/users', userController.findAllUser)


module.exports = router;