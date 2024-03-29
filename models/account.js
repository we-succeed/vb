const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//bank account
const AccountSchema = new Schema({
    type: {
        type: String,
        required: [true]
    },
    name: {
        type: String,
        required: [false]
    },
    description: {
      type: String,
      required: [false]
    },
    quantity: {
        type: Number,
        required: [true]
    },
    remainder: {
        type: Number,
        required: [false]
    },
    interest : {
        type: Number,
        required: [true]
    },
    status: {
        type: Boolean,
        required: [true]
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })
//Create model for account
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account