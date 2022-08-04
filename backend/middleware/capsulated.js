const bcrypt = require("bcrypt");

module.exports =  (req, res, next) => {
    console.log(req.body.password);
        try {
            const salt =  bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword =  bcrypt.hash(req.body.password, salt);
            req.password = hashPassword;
            next();
        } catch (e) {
            return res.status(400).send(e);
        }
}