const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi"); //vaildation module

const UserSchema = new Schema({
    firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	province: { type: String },
	city: { type: String },
	address: { type: String },
	postalCode: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phoneNumber: { type: Number },
	accounts: [],
});

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

// Create model for user
const User = mongoose.model('User', UserSchema)

//validation

const validate = (data) => {
	console.log(data);
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().max(10).required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = {User, validate, UserSchema}