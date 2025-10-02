const jwt = require('jsonwebtoken');
const User = require("../modelSchema/useModel");

const authUser = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        const { accessToken } = cookies;

        if (!accessToken) {
            return res.status(401).send("Please Login!");
        }

        const decodedMessage = jwt.verify(accessToken, " your_very_secure_secret_here");

        const { id } = decodedMessage;

        const user = await User.findById(id);

        if (!user) {
            throw new Error("User not found")
        }

        req.user = user;
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send("Access token expired. Please login again.");
        }
        return res.status(401).send("Invalid token. Please login.");
    }
}


module.exports = authUser;