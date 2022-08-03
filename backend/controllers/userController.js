const express = require('express'); 
const { User, validate } = require('../models/user');
const bcrypt = require("bcrypt");

const create = (async (req, res) => {

	try {
		const { error }  = validate(req.body);
	
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const findAll = (async (req, res) => {
	try {
		const users = await User.find({});
		if (users)
			return res
				.status(200).send(users);
		else
			return res.status(400).send({'message': 'no data'});
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const findUserById = (async (req,res) => {
	try {
		const user = await User.findById({_id: req.params.user_id});
		if (user)
			return res.status(200).send(user);
	} catch (e) {
		console.log(e);
		res.status(500).send({ message: "Internal Server Error" });
	}
})

const deleteUserById = (async (req,res) => {
	try {
		const result = await User.deleteOne({_id: req.params.user_id});
		if (result && result.deletedCount > 0 ) 
			return res.status(200).send({message : 'delete user completed'})
		else
			return res.status(400).send({message: 'bad request'})
	} catch (e) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})

const updateUserById = (async (req,res) => {
	try {
		const result = await User.updateOne({_id: req.params.user_id}, {lastName: req.body.lastName})
	
		res.status(200).send({message: 'update'})
	} catch(e){
		res.status(500).send({ message: "Internal Server Error" });
	}
})
module.exports = {
    create,
		findAll,
		findUserById,
		deleteUserById,
		updateUserById
}