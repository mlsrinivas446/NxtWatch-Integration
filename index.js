const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const RegisterUser = require('./model');
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 5000;

mongoose.connect("mongodb+srv://mlsrinivas2233:kEV0uqSqJ1X4VBFQ@cluster0.iskje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connection established"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const authenticateToken = (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'];
    
    if (!jwtToken) {
      return res.status(401).send('Token Not Found');
    }

    jwt.verify(jwtToken, 'jwt_token', (error, payload) => {
      if (error) {
        return res.status(403).send('Invalid Access Token');
      } else {
        req.user = payload;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Access Token");
  }
};

app.get('/myprofile', authenticateToken, async (req, res) => {
  try {
    let user = await RegisterUser.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(400).send("Invalid User");
    }
    
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword, gender, location } = req.body;
    //console.log("Received data:", req.body);
    const userExisting = await RegisterUser.findOne({ email });
    
    if (userExisting) {
      return res.status(400).send("User Already Existed");
    }
    
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new RegisterUser({
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
});

app.post('/login', async (req, res) => {  
  try {
    const { email, password } = req.body;

    let userExist = await RegisterUser.findOne({ email });
    
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
});

