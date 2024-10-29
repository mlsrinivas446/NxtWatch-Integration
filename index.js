const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config()
const router = require("./routes/index")
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" , methods: "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true,}));

const PORT = 5000;

app.use("/api", router)

mongoose.connect("mongodb+srv://mlsrinivas2233:kEV0uqSqJ1X4VBFQ@cluster0.iskje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connection established"))
  .catch(err => {
    console.log("DB connection error:", err); 
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



