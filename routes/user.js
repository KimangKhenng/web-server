const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.js")
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

router.get("/", userController.getAllUsers)

router.post("/", jsonParser, userController.createUser)

router.get("/:id", userController.getUserById)

router.put("/:id", jsonParser, userController.updateById)

router.delete("/:id", userController.deleteById)

module.exports = router