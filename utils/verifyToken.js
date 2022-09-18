const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
module.exports = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    try {
        if ( typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            await jwt.verify(bearer[1], process.env.JWTPRIVATEKEY);
            next();
        } else if (req.cookies['vb']) {
            const decode = User().generateDecodeToken(req.cookies['vb']);
            const user = await User.findOne({email: req.body.auth.email});
            if (user && (user._id && decode._id)){
                next();
            }
        } else {
            res.status(403).json({message: "Token is not found."});
        }
    } catch (e) {
        res.status(403).json({message: "Token is not found."})
    }
}