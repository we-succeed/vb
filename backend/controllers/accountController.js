const express = require('express'); 
const Account = require('../models/account');

//Define account logic for routes
const findAll = (req, res, next) => {
    Account.find({}, 'action')
    .then((data) => res.json(data))
    .catch((err) => console.log(err));  
}
const create = (req, res, next) => {
    Account.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}
const deleteById = (req, res, next) => {
    Account.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}

module.exports = {
    findAll,
    create,
    deleteById
}