const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController')

//restfullAPI
router.get('/contacts', contactController.findAllContact)
router.get('/contacts/:contact_id', contactController.findContactById),
router.post('/contacts', contactController.contactCreate)
router.put('/contacts/:contact_id', contactController.updateContactById)
router.delete('/contacts/:contact_id', contactController.deleteContractById)

module.exports = router;
