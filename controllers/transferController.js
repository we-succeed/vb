const {Transfer} = require('../models/transfer');
const {UserAccount} = require("../models/user");

//AccountItem
const getUserTransfers = async (req, res) => {
    try {
        const account = await (await UserAccount.findById({_id: req.params.userAccountId})).populate({path: 'transfers',
        populate:{path: 'to', model:'UserAccount'}});
        if (account) {
            res.status(200).json({userAccounts: account})
        } else {
            res.status(400).send({message: 'Not Fount Transaction'})
        }
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const addTransfer = async (req, res) => {
    try {
        const transferResult = await new Transfer({...req.body}).save();
        await updateUserAccountBalance(req, res, transferResult);
        const userAccountResult =  await updateUserAccountTransfer(req, res, transferResult._id);
        if (userAccountResult)
            res.status(200).send({message: `Your transfer to {bank name} was successful.`});
        else
            res.status(400).send({message: 'Bad Request'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}
const updateUserAccountTransfer = async (req, res, transferResultId) => {
    try {
        return await UserAccount.findOneAndUpdate({_id: req.body.from}, {$push: {transfers: {_id: transferResultId}}}, {
            upsert: true,
            setDefaultsOnInsert: true
        })
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}
const rollBackTransaction = async (tx) => {
    return UserAccount.deleteOne({_id: tx.from._id});
}
const updateUserAccountBalance = async (req, res, transfer) => {
    try {
        const from = await UserAccount.findById({_id:transfer.from._id});
        if (from.balance < req.body.amount) {
            await rollBackTransaction(transfer);
            res.status(400).json({message: 'Insufficient balance'});
        } else {
            await UserAccount.updateOne({_id: transfer.from._id}, {$inc: {balance: -(transfer.amount)}})
            await UserAccount.updateOne({_id: transfer.to._id}, {$inc: {balance: +(transfer.amount)}})
        }
        return transfer
    } catch (e) {
        console.log(e.toJSON());
        res.status(500).json({message: 'Internal Server Error'})
    }
}
module.exports = {
    getUserTransfers,
    addTransfer,
}