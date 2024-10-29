const User = require("../models/userModel")
const bcrypt = require("bcrypt");

const UserRegister =  async (req, res) => {
    try {
        const { username, email, password, confirmPassword, gender, location } = req.body;
        //console.log("Received data:", req.body);
        const userExisting = await User.findOne({ email });
        
        if (userExisting) {
        return res.status(400).send("User Already Existed");
        }
        
        if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        location,
        });

        await newUser.save();
        return res.status(200).send("Registered Successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = UserRegister