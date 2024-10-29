const express = require("express")
const UserRegister = require("../controllers/userRegister")
const UserLogin = require("../controllers/userLogin")
const UserDetails = require("../controllers/userDetails")
const Home = require("../controllers/home")
const Trending = require("../controllers/trending")
const Gaming = require("../controllers/gaming")
const VideoDetails = require("../controllers/videoDetails")
const AuthenticateToken = require('../middlewares/authenticateToken');
const router = express.Router()

router.post("/register", UserRegister)
router.post("/login", UserLogin)
router.get("/my-profile", AuthenticateToken, UserDetails)
router.get("/home", Home)
router.get("/trending", Trending)
router.get("/gaming", Gaming)
router.get("/video-details/:id", VideoDetails)
module.exports = router