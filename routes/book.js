const express = require("express")
const router = express.Router()
const bookController = require("../controllers/book.js")

router.get("/", bookController.getAllBooks)

module.exports = router