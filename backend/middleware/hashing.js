const bcrypt = require("bcrypt");

module.exports =  async (req, res, next) => {
        try {
            const salt =  await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.password = hashPassword;
            next();
        } catch (e) {
            return res.status(500).send({message: 'Internal Server Error'});
        }
}