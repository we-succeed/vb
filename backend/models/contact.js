const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })


const Contact = mongoose.model('Contact', ContactSchema)
module.exports = {Contact}