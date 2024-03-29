const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ETransferSchema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'Contract'},
    amount: {type: Number},
    description: {type: String},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
// Create model for Transfer
const ETransfer = mongoose.model('ETransfer', ETransferSchema)
module.exports = {ETransfer}