const bookData = require("../data/book.js")
const books = bookData.books

exports.getAllBooks = ((req, res) => {
    res.send(books)
})
