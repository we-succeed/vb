const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    } catch (e) {
        res.status(500).json({status: "failed", message: "Interval server error"})
        res.end();
    }

}