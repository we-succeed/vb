const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const login = (async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        let user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(401).send({message: "Invalid Email"});
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({message: "Invalid Password"});

        const sendData = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.generateAuthToken()
        }
        res.cookie('vb', sendData.token, { expires: new Date(Date.now() + 900000),httpOnly: true, secure: false})
        res.status(200).send({user: sendData, message: " User logged in successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};
module.exports = {
    login
};