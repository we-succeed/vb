const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    balance: {
        type: Number,
        required: [false]
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })
//Create model for account
const Account = mongoose.model('accounts', AccountSchema);

module.exports = Account