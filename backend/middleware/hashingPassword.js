const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.password = hashPassword;
        next();
    } catch (e) {
        res.status(500).json({status: "failed", message: "Interval server error"})
        res.end();
    }

}