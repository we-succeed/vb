const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/userController')

//restfullapi
// router.get('/users', userController.findAll)
//router.post('/users', userController.create)
//router.delete('/users/:id', userController.deleteById)

router.post('/users', userController.create)


module.exports = router;