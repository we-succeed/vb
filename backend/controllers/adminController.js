const { default: userEvent } = require('@testing-library/user-event');
const express = require('express'); 
const Admin = require('../models/admin');

//Get user info
const findAll = async(req, res, next) => {
    
    try{
        const users = await Admin.findById(req.params.id)
        res.status(200).json(users)
    }

    catch{
            res.status(404).json("not found")
    }

}
//insertgin user to admin
const create = async(req, res) => {
    try{
        const testing = await Admin.find();

        //inserting students
        for(var j = 0; j < 100; j++){
            console.log(j)
            for(var i = 0; i < 100; i++){

                const user = new Admin({
                    name: name[Math.floor(Math.random()*1000)],
                    yearofbatch: "2018",
                    collegeid: testing[j]._id,
                    institute: testing[j]._id,
                    skills :['Cpp', 'Java', 'Python']
                })
                try{
                    await user.save()
                }
                catch(err){
                    console.log(err)
                }
            }
       }

        res.status(200).json("completed")
    }
    catch(err){
        res.status(501).json(err)
    }
}

const updateById = async(req, res, next) => {
   try {
        await Admin.findOneAndUpdate(req.user_id)
        res.json({msg:"User Deleted Successfully..!!"});
   } catch(error) {
    res.status(500).json({err:error.message || "Error while updating user"})
   }

}

//delete user controller
const deleteById = async(req, res, next) => {
   try {
        await Admin.findOneAndDelete(req.user_id)
        res.json({msg:"User Deleted Successfully..!!"});
   } catch(error) {
    res.status(500).json({err:error.message || "Error while deleting user"})
   }

}

module.exports = {
    findAll,
    create,
    updateById,
    deleteById
}