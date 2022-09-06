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
        const txResult = await new Tx({...req.body}).save();
        await updateUserAccountBalance(req, res, txResult);
        const userAccountResult =  await updateUserAccountTx(req, res, txResult._id);
        if (userAccountResult)
            res.status(200).send({message: `Your transfer to {bank name} was successful.`});
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
const rollBackTransaction = async (tx) => {
    return UserAccount.deleteOne({_id: tx.from._id});
}
const updateUserAccountBalance = async (req, res, tx) => {
    try {
        const from = await UserAccount.findById({_id:tx.from._id});
        if (from.balance < req.body.amount) {
            await rollBackTransaction(tx);
            res.status(400).json({message: 'Insufficient balance'});
        } else {
            await UserAccount.updateOne({_id: tx.from._id}, {$inc: {balance: -(tx.amount)}})
            await UserAccount.updateOne({_id: tx.to._id}, {$inc: {balance: +(tx.amount)}})
        }
        return tx
    } catch (e) {
        console.log(e.toJSON());
        res.status(500).json({message: 'Internal Server Error'})
    }
}
module.exports = {
    userTransactionInfo,
    createTransaction,
}