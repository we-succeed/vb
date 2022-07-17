const express = require('express'); 
const router = express.Router();
const todoController = require('../controllers/todoController')

//restfullapi
router.get('/todos', todoController.findAll)
router.post('/todos', todoController.create)
router.delete('/todos/:id', todoController.deleteById)

module.exports = router;