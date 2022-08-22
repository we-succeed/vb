const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContractSchema = new Schema({
    name: {type: String},
    email: {type: String},
    mobile: {type: String}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })


const Contract = mongoose.model('Contract', ContractSchema)
module.exports = {Contract}