const {User} = require('../models/user');

const create = (async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user)
            return res.status(409).send({message: "User with given email already Exist!"});
        const result = await new User({...req.body}).save();
        if (result._id)
            return res.status(201).send({message: "User created successfully"});
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});

const findAllUser = (async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        if (users)
            return res.status(200).send({users: users});
        else
            return res.status(400).send({'message': 'no user data'});
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});

const findUserById = (async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.user_id}, '-password');
        if (user)
            return res.status(200).send(user);
    } catch (e) {
        return res.status(500).send({message: "Internal Server Error"});
    }
})
const updateUserById = (async (req, res) => {
    try {
        const result = await User.updateOne({_id: req.params.user_id}, req.body, {
            upsert: true,
            setDefaultsOnInsert: true
        })
        if (result && result.modifiedCount > 0)
            return res.status(201).send({message: 'Update completed'})
        else
            return res.status(400).send({message: 'Updated fails'})
    } catch (e) {
        return res.status(500).send({message: "Internal Server Error"});
    }
})

const deleteUserById = (async (req, res) => {
    try {
        const result = await User.deleteOne({_id: req.params.user_id});
        if (result && result.deletedCount > 0)
            return res.status(200).send({message: 'delete user completed'})
        else
            return res.status(400).send({message: 'bad request'})
    } catch (e) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

const getUserAccounts = (async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.user_id}, 'userAccounts')
            .populate({
                path: 'userAccounts',
                select: 'number name description balance',
                populate: {path: 'account', model: 'Account', select: 'type interest'}
            })
        if (user)
            return res.status(200).send(user);
        else
            return res.status(400).send({message: 'Bad request'})
    } catch (e) {
        return res.status(500).send({message: "Internal Server Error"});
    }
})


module.exports = {
    create,
    findAllUser,
    findUserById,
    deleteUserById,
    updateUserById,
    getUserAccounts
}