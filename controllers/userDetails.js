// get user details
const User = require("../models/userModel");

const userDetails = async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(400).send("Invalid User");
        }
        
        res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
};

module.exports =  userDetails ;
