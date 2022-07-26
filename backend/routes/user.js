const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/userController')

//restfullapi
// router.get('/user', userController.findAll)
// router.post('/user', userController.create)
// router.delete('/user/:id', userController.deleteById)

router.post('/', userController.create)


module.exports = router;