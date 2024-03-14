const express = require("express")
const router = express.Router()
const { createUserValidator, loginUserValidator } = require("../validators/user.js")
const { validationErrorHandler } = require("../middleware/index.js")
const { createUser, loginUser, googleLogin, handleGoogleLogin } = require("../controllers/user.js")
const passport = require("passport")

router.post("/register", createUserValidator, validationErrorHandler, createUser)
router.post("/login", loginUserValidator, validationErrorHandler, loginUser)
router.get("/google-login", passport.authenticate('google', { scope: ['profile', 'email'] }), handleGoogleLogin)
router.get("/google", passport.authenticate('google'), handleGoogleLogin)

module.exports = router