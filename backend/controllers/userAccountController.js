const {UserAccount, User} = require("../models/user");
const {getAvailableAccountById, updateRemainder} = require("./accountController");

const saveUserAccount = (async (req, res) => {
    try {
        const account = await getAvailableAccountById(req, res);
        let newNumber = await accountRandomNumber();
        const userAccount = await new UserAccount({
            account: account._id,
            name: req.body.userAccount.name,
            description: req.body.userAccount.description,
            number: newNumber
        }).save();
        const resultUser = await User.findOneAndUpdate({_id: '630bba9a8a17f745b3d1b7e1'}, {$push: {userAccounts: {_id: userAccount._id}}}, {
            upsert: true,
            setDefaultsOnInsert: true
        })
        const accountResult = await updateRemainder(account);
        if (resultUser && accountResult.modifiedCount > 0) {
            res.status(201).send({message: "Congratulations! You created new account.", number: newNumber});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({message: "Internal Server Error"});
    }
})

//create Number While avoiding duplication number
const accountRandomNumber = async () => {
    try {
        while (true) {
            const number = (Math.floor(1000 + Math.random() * 90000));
            const result = await UserAccount.findOne({number: number})
            if (!result)
                return number
        }
    } catch (e) {
        console.log(e.toJSON());
    }
}
module.exports = {
    saveUserAccount,
}