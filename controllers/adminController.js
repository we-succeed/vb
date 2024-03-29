const {Admin} = require('../models/admin');

//Define admins logic for routes
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        if (admins && admins.length < 1)
            return res.status(400).json({error: "No create users found"})
        res.status(200).json(admins)
    } catch (error) {
        console.log(error);
        res.status(500).json({meg: 'error looking for users'})
    }
}

const createAdmin = async (req, res) => {
    try {
        const admin = await new Admin(req.body).save();
        if ( admin )
            return res.status(201).json({message: 'Admin Added Successfully'});
        else
            return res.status(400).json({error: "Admin Added Fails."})
    } catch (error) {
        console.log(error);
        res.status(500).json({meg: 'you got the error for making users'})
    }
}

const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findOneAndUpdate(req.params.adminId, req.body, {
            upsert: true,
            setDefaultsOnInsert: true
        })
        res.status(200).json({updatedAdmin, message: 'User has been updated'})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'you got update error'})
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.adminId)
        await admin.remove()
        res.status(200).json({id: req.params.adminId, meg: 'User has been deleted'})

    } catch (error) {
        res.status(500).json({meg: 'you got delete error'})
    }
}


module.exports = {
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
}