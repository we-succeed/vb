const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'Contract'},
    amount: {type: Number},
    description: {type: String},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
// Create model for Transfer
const Transfer = mongoose.model('Transfer', TransferSchema)
module.exports = {Transfer}