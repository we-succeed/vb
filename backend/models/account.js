const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    number: {
        type: Number,
        required: [true]
    },
    type: {
        type: String,
        required: [true]
    },
    balance: {
        type: Number,
        required: [false]
    },
    creationDate: {
        type: String,
        required: [true]
    },
    status:{
        type: Number,
    }
})

//Create model for account
const AccountModel = mongoose.model('account', AccountSchema);

module.exports = {
    AccountSchema,
    AccountModel
};