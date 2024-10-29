// get user details
const User = require("../models/userModel");

const UserDetails = async (req, res) => {
    try {
        console.log(req.user.id)
        let user = await User.findById(req.user.id).select("-password");
        console.log(user)
        
        if (!user) {
            return res.status(400).send("Invalid User");
        }
        console.log(user)
        res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
};

module.exports =  UserDetails ;
