const {Tx} = require('../models/transaction');
const {UserAccount} = require("../models/user");

//userAccounts
const userTransactionInfo = async (req, res) => {
    try {
        const account = await (await UserAccount.findById({_id: req.params.userAccountId}))
            .populate({
                path: 'transactions',
                populate: {path: 'to', model: 'UserAccount'}
            });
        if (account) {
            return res.status(200).json({message: 'Succeeded.', userAccount: account})
        } else {
            return res.status(400).send({message: 'Not Fount Transaction'})
        }
    } catch (e) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

const createTransaction = async (req, res) => {
    try {
        const txResult = await new Tx({...req.body}).save();
        const result =  updateUserAccountTx(txResult._id);
        if (result)
            res.status(201).send({message: 'Bad Request'})
        else
            res.status(400).send({message: 'Bad Request'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}
const updateUserAccountTx = async (req, res, txResultId) => {
    try {
        return await UserAccount.findOneAndUpdate({_id: req.body.from}, {$push: {transactions: {_id: txResultId}}}, {
            upsert: true,
            setDefaultsOnInsert: true
        })
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }

}
module.exports = {
    userTransactionInfo,
    createTransaction,
}