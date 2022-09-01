const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController')

//restfullAPI
router.get('/:userId', contactController.findContactById)
router.post('/:userId', contactController.contactCreate)
router.put('/:contact_id', contactController.updateContactById)
router.delete('/:contact_id', contactController.deleteContractById)

module.exports = router;
