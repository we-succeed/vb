const { default: userEvent } = require('@testing-library/user-event');
const express = require('express'); 
const Admin = require('../models/admin');

//Define admins logic for routes
const getAdmins = async (req, res, next) => {
    
    try {
        const admins = await Admin.find()
        // if(!admins) {
        //     return res.status(204).json({error: "No users found"})
        // }
        res.status(200).json(admins)

      
  
    } catch(error)  {
        res.status(500).json({meg: 'error looking for users'})
    }
}

const createAdmin = async (req, res, next) => {

    try {
        console.log(req.body);
        const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            user_id: req.body.user_id
        })
        const admin = await Admin.create(newAdmin)
        if (!admin) {
            return res.status(404).json({ error: "No create users found" })
          }
        res.status(200).json(admin)
    
    } catch(error)  {
        res.status(500).json({meg: 'you got the error for making users'})
     }
}

const updateAdmin = async (req, res, next) => {

    try {
        const admin = await Admin.findById(req.params.id)

        if(!admin) {
            return res.status(404).json({ message: "User doesn't exist." });
        }
    
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
    
        res.status(200).json(updatedAdmin)

    } catch(error)  {
        res.status(500).json({meg: 'you got update error'})
     }
}

const deleteAdmin = async (req, res, next) => {

    try {
        const admin = await Admin.findById(req.params.id)

        if(!admin) {
            res.status(400)
            throw new Error('admin not found')
        }
    
        await admin.remove()
    
        res.status(200).json( {id: req.params.id})
    } catch(error)  {
        res.status(500).json({meg: 'you got delete error'})
     }
}


module.exports = {
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin 
}