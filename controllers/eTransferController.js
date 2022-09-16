const {ETransfer} = require('../models/eTransfer');
const {UserAccount} = require("../models/user");

//AccountItem
const getEtransfers = async (req, res) => {
    try {
        const account = await UserAccount.findById({_id: req.params.userAccountId}).populate({path: 'eTransfers',
        populate:{path: 'to', model:'Contact'}});
        if (account) {
            res.status(200).json({userAccounts: account})
        } else {
            res.status(400).send({message: 'Not Fount Transfers'})
        }
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const addEtransfer = async (req, res) => {
    try {
        const etResult = await new ETransfer({...req.body}).save()
        const result  = await UserAccount.findOneAndUpdate({_id: req.body.from}, { $push: { eTransfers: {_id: etResult._id} } },{
            upsert: true,
            setDefaultsOnInsert: true
        })
        if (result)
            res.status(201).send({message: "e-transfer created successfully"});
        else
            res.status(400).send({message: 'Bad Request'})
    } catch(e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {
    getEtransfers,
    addEtransfer,
}