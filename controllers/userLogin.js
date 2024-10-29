const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

const UserLogin= async (req, res) => {  
    try {
        const { email, password } = req.body;

        let userExist = await User.findOne({ email });
        
        if (!userExist) {
        return res.status(400).send("Invalid User");
        }

        const checkPassword = await bcrypt.compare(password, userExist.password);
        
        if (!checkPassword) {
        return res.status(400).send("Invalid Password");
        }

        const payload = {
        id: userExist.id,
        email: email,
        };

        jwt.sign(payload, "jwt_token", { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.error("JWT signing error:", err);
            return res.status(500).send("Server Error");
        }

        return res.json({ jwt_token: token });
        });

    } catch (err) {
        console.log("login error:", err);
        return res.status(500).send("Server Error");
    }
};

module.exports = UserLogin

