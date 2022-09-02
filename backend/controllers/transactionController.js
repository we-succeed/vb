const {Tx} = require('../models/transaction');
const {UserAccount} = require("../models/user");

//AccountItem
const userTransactionInfo = async (req, res) => {
    try {
        const account = await (await UserAccount.findById({_id: req.params.userAccountId})).populate({path: 'transactions', 
        populate:{path: 'to', model:'UserAccount'}});
        if (account) {
            res.status(200).json({message: '12345', userAccount: account})
        } else {
            res.status(400).send({message: 'Not Fount Transaction'})
        }
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const createTransaction = async (req, res) => {
    try {
        const txResult = await new Tx({...req.body}).save()
        const result =  await updateUserAccountTx(txResult._id);

        if (result)
            res.status(201).send({message: "Tx created successfully"});
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