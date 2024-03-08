const express = require('express')
const app = express()
const port = 8000
const user = require("./routes/user.js")
const book = require("./routes/book.js")

const userSchema = require("./model/user.js")
const middleware = require("./middleware/auth.js")
const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/my-db"

async function dbConnect() {
    await mongoose.connect(url)
}

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));

dbConnect().catch((err) => { console.log(err) })

app.use(express.static("frontend/dist"))
app.use("/api/user", user)
app.use("/api/book", book)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})