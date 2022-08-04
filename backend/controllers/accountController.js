const Account = require('../models/account');

//get all accounts
const findAccountAll = async (req, res) => {
    try {
        const result = await Account.find({}, '');
        if (result)
            res.status(200).send(result);
        else
            res.status(400).send({message: 'Not Fount Account'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}
//get one account
const findAccountById = async (req, res) => {
    try {
        const result = await Account.findById({_id: req.params.account_id}, '');
        if (result)
            res.status(200).send(result);
        else
            res.status(400).send({message: 'Not Fount Account'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}
//create Account
const createAccount = async (req, res) => {
    try {
        const newAccount = new Account(req.body)
        const result = await newAccount.save();
        if (result)
            res.status(201).send({message: 'Added an account succeed.'});
        else
            res.status(400).send({message: 'Bad Request'})
    } catch (e) {
        if (e.name === "ValidationError") {
            let errors = {};
            Object.keys(e.errors).forEach((key) => {
                errors[key] = e.errors[key].message;
            });
            return res.status(400).send(errors);
        }
        res.status(500).json({message: 'Internal Server Error', error: e})
    }
}

//update Account
const updateAccount = async (req, res) => {
    try {
        const result = await Account.updateOne({_id: req.params.account_id}, {description: req.body.description})
        if (result && result.modifiedCount > 0)
            res.status(200).send({message: 'Update completed.'})
        else
            res.status(400).send({message: 'Bad request'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error', error: e})
    }
}

//delete Account
const deleteAccount = async (req, res) => {
    try {
        const result = await Account.deleteOne({_id: req.params.account_id});
        if (result && result.deletedCount > 0)
            res.status(200).json({message: 'Deleted account succeed.'})
        else
            res.status(400).json({message: 'Not deleted.'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error', error: e})
    }
}
module.exports = {
    findAccountAll,
    findAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}