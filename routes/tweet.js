const express = require("express")
const router = express.Router()
const { getTweetById } = require("../controllers/tweet.js")

router.get("/:id", getTweetById)

module.exports = router