const express = require("express")
const router = express.Router()
const { getAllUsers, createUser, getUserById, updateById, deleteById, getTweetsByUserId } = require("../controllers/user.js")
const { createUserValidator } = require("../validators/user.js")
const { validationErrorHandler } = require("../middleware/index.js")

router.get("/", getAllUsers)

router.post("/", createUserValidator, validationErrorHandler, createUser)

router.get("/:id", getUserById)

router.get("/:id/tweets", getTweetsByUserId)

router.put("/:id", updateById)

router.delete("/:id", deleteById)

module.exports = router