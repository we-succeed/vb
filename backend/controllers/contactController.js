const {Contact} = require('../models/contact');

const contactCreate = (async (req, res) => {
    try {
        const contact = await Contact.findOne({email: req.body.email});
        if (contact)
            return res.status(409).send({message: "Contact with given email already Exist!"});
        await new Contact({...req.body}).save();
        res.status(201).send({message: "Contact created successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

const findAllContact = (async (req, res) => {
    try {
        const contacts = await Contact.find({}, 'name email mobile');
        if (contacts)
            return res
                .status(200).send(contacts);
        else
            return res.status(400).send({'message': 'no data'});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

const findContactById = (async (req, res) => {
    try {
        const contact = await Contact.findById({_id: req.params.user_id}, 'name email mobile');
        if (contact)
            return res.status(200).send(contact);
    } catch (e) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

const deleteContractById = (async (req, res) => {
    try {
        const result = await Contact.deleteOne({_id: req.params.user_id});
        if (result && result.deletedCount > 0)
            return res.status(200).send({message: 'delete contact completed'})
        else
            return res.status(400).send({message: 'bad request'})
    } catch (e) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

const updateContactById = (async (req, res) => {
    try {
        const result = await Contact.updateOne({_id: req.params.user_id}, req.body, {
            upsert: true,
            setDefaultsOnInsert: true
        })
        if (result && result.modifiedCount > 0)
            return res.status(200).send({message: 'update'})
        else
            return res.status(400).send({message: ''})
    } catch (e) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

// const getContactAccounts = (async (req, res) => {
//     try {
//         const contactAccounts = await Contact.findById({_id: req.params.contact_id}, 'contacts')
//             .populate({ path : 'contacts', populate:{path: 'contact', model: 'Contact'}})
//         if (contactAccounts) {
//             return res.status(200).send(contactAccounts);
//         } else
//             return res.status(400).send({message: 'Bad request'})
//     } catch (e) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// })



module.exports = {
    contactCreate,
    findAllContact,
    findContactById,
    deleteContractById,
    updateContactById,
  
}