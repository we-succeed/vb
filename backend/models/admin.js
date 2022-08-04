const mongoose = require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    type: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId}
})

const validateAdminUser = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        type: Joi.string().required().label("Type"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
    }).options(
        {
            abortEarly: false, //include all errors
            allowUnknown: true, //ignore unknown props
            stripUnknown: true  // remove unknown props
        });
    return schema.validate(user);
}

const Admin = mongoose.model('admin', AdminSchema);

module.exports = {
    Admin,
    validateAdminUser
};


