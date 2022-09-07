const {Transfer} = require('../models/transfer');
const {UserAccount} = require("../models/user");

//AccountItem
const userTransferInfo = async (req, res) => {
    try {
        const account = await (await UserAccount.findById({_id: req.params.userAccountId})).populate({path: 'transfers', 
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

const createTransfer = async (req, res) => {
    try {
        const etResult = await new Transfer({...req.body}).save()
        const result  = await UserAccount.findOneAndUpdate({_id: req.body.from}, { $push: { transfers: {_id: etResult._id} } },{
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
    userTransferInfo,
    createTransfer,
}