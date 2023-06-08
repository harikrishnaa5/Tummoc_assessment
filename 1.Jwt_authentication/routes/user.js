const express = require("express")
const router = express.Router()
const {signup, signin, logout} = require("../controllers/authController.js")
const authMiddleware = require("../middlewares/authJWT.js")

router.post("/register", signup)
router.post("/login", signin)
router.post("/logout", authMiddleware, logout)

module.exports = router

