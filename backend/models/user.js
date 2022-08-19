const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const AccountItem = {
    accountId: '',
    number: 0,
    name: '',
    description: '',
    balance: 0,
    transfers: [],
    created_at: '',
    updated_at: ''
};

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    province: {type: String},
    city: {type: String},
    address: {type: String},
    postalCode: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    accounts: [AccountItem],
});


UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

//validation
const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().min(6).required().label("Password"),
	}).options(
		{
			abortEarly: false, //include all errors
			allowUnknown: true, //ignore unknown props
			stripUnknown: true  // remove unknown props
		});
	return schema.validate(data);
};

// Create model for user
const User = mongoose.model('User', UserSchema)

module.exports = {User, validateUser, AccountItem}