const express = require("express")
const router = express.Router()
const { createUserValidator, loginUserValidator } = require("../validators/user.js")
const { validationErrorHandler } = require("../middleware/index.js")
const { createUser, loginUser } = require("../controllers/user.js")

router.post("/register", createUserValidator, validationErrorHandler, createUser)
router.post("/login", loginUserValidator, validationErrorHandler, loginUser)

module.exports = router