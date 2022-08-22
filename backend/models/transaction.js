const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TxSchema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    amount: {type: Number},
    source: {type: String},
    type: {type: String},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })
// Create model for Transfer
const Tx = mongoose.model('Tx', TxSchema)
module.exports = {Tx}