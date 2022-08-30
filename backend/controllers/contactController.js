const { Contact } = require('../models/contact');
const { User } = require('../models/user');

const contactCreate = (async (req, res) => {
    try {
        const contact = await new Contact({ ...req.body }).save();
        const result = await User.findOneAndUpdate({ _id: req.params.userId}, { $push: { contacts: { _id: contact._id } } }, {
            upsert: true,
            setDefaultsOnInsert: true
        })
        res.status(201).send({ message: "Contact created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const findContactById = (async (req, res) => {
    try {
        const user = await (await User.findById({ _id: req.params.userId }, 'contacts')).populate('contacts');
        if (user){
            return res.status(200).send(user.contacts);}
        else
            return res.status(400).send({ message: 'no data' });
    } catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

const deleteContractById = (async (req, res) => {
    try {
        const result = await Contact.deleteOne({ _id: req.params.contact_id });
        if (result && result.deletedCount > 0)
            return res.status(200).send({ message: 'delete contact completed' })
        else
            return res.status(400).send({ message: 'bad request' })
    } catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})


const updateContactById = (async (req, res) => {
    try {
        const result = await Contact.updateOne({ _id: req.params.contact_id }, req.body, {
            upsert: true,
            setDefaultsOnInsert: true
        })
        if (result && result.modifiedCount > 0)
            return res.status(200).send({ message: 'update' })
        else
            return res.status(400).send({ message: 'no update' })
    } catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

const addContact = async (req, res) => {
    try {
        const user = await new User({
            contact: req.body.contact._id
        }).save();
        const result = await User.findOneAndUpdate({ _id: req.body.user._id }, { $push: { contacts: { _id: user._id } } }, {
            upsert: true,
            setDefaultsOnInsert: true
        })
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


module.exports = {
    contactCreate,
    findContactById,
    deleteContractById,
    updateContactById,
    addContact
}