const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new Schema({
    role: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    province: {type: String},
    city: {type: String},
    address: {type: String},
    postalCode: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String},
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount'
    }],
    contract: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });


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
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid('Admin', 'User').required()
	}).options(
		{
			abortEarly: false, //include all errors
			allowUnknown: true, //ignore unknown props
			stripUnknown: true  // remove unknown props
		});
	return schema.validate(data);
};

const UserAccountSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    number: {type: Number},
    name: {type: String},
    description: {type: String},
    balance: {type: Number, defaultValue: 0},
    transfers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfer'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })
// Create model for user
const User = mongoose.model('User', UserSchema)
const UserAccount = mongoose.model('UserAccount', UserAccountSchema)

module.exports = {User, validateUser, UserAccount}