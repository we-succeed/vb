const express = require('express');
const router = express.Router({mergeParams: true});
const contactController = require('../controllers/contactController')

//restfullAPI
router.get('/', contactController.findContactByUserId)
router.post('/', contactController.addContact)
router.put('/:contactId', contactController.updateContactById)
router.delete('/:contactId', contactController.deleteContractById)

module.exports = router;
