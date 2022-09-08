const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount'},
    amount: {type: Number},
    source: {type: String},
    type: {type: String},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })
// Create model for Transfer
const Transfer = mongoose.model('Transfer', TransferSchema)

module.exports = {Transfer}