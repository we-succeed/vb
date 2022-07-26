const express = require('express'); 
const router = express.Router();
const accountController = require('../controllers/accountController')

//restfullapi
router.get('/accounts', accountController.findAll)
router.post('/accounts', accountController.create)
router.delete('/accounts/:id', accountController.deleteById)

module.exports = router;