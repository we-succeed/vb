const express = require('express'); 
const { User, validate } = require('../models/user');
const bcrypt = require("bcrypt");

//Define business logic for routes
// const findAll = (req, res, next) => {
// 	console.log('getUser');
//     User.find({}, 'username')
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err));  
// }
// const create = (req, res, next) => {
//     User.create(req.body)
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err));
// }
// const deleteById = (req, res, next) => {
//     User.findOneAndDelete({ _id: req.params.id })
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err));
// }

const create = (async (req, res) => {
	// checking code
	// console.log(req.body);
	// const salt = await bcrypt.genSalt(Number(process.env.SALT));
	// const hashPassword = await bcrypt.hash(req.body.password, salt);
	// console.log(hashPassword)

	try {
		console.log(req.body);
		const { error }  = validate(req.body);
	
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = {
    create
}