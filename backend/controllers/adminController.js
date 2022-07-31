const { default: userEvent } = require('@testing-library/user-event');
const express = require('express'); 
const Admin = require('../models/admin');

//Define admins logic for routes
const getAdmins = async (req, res, next) => {

    const admins = await Admin.find()
    res.status(200).json(admins)
}

const setAdmin = async (req, res, next) => {

    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const admin = await Admin.create({
        text: req.body.text
    })

    res.status(200).json(admin)
}
const updateAdmin = async (req, res, next) => {

    const admin = await Admin.findById(req.params.id)

    if(!admin) {
        res.status(400)
        throw new Error('admin not found')
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedAdmin)
}

const deleteAdmin = async (req, res, next) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin) {
        res.status(400)
        throw new Error('admin not found')
    }

    await admin.remove()

    res.status(200).json( {id: req.params.id})
}



module.exports = {
    getAdmins,
    setAdmin,
    updateAdmin,
    deleteAdmin 

}