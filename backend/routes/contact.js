const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController')

//restfullAPI
router.get('/contacts/:userId', contactController.findContactById)
router.post('/contacts/:userId', contactController.contactCreate)
router.put('/contacts/:contact_id', contactController.updateContactById)
router.delete('/contacts/:contact_id', contactController.deleteContractById)

module.exports = router;
