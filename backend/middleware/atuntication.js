const jwt = require('jsonwebtoken')
const User = require("../users/Models/usersSchema")
const Authentcation = async (req, resp, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id, verifyToken, _id, "token:token": token });
        if (!rootUser) { throw new Error("User not found") }

        req.token = token;
        req.rootUser = rootUser;


    } catch (err) {
        resp.status(401).send("Unauthorized:No taken Provider");
        console.log(err)
    }
}


module.exports = Authentcation;