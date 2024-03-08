const express = require('express')
const app = express()
const port = 8000
const user = require("./routes/user.js")

const dbConnect = require("./db/db.js")

dbConnect().catch((err) => { console.log(err) })

app.use(express.static("frontend/dist"))
app.use("/api/users", user)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})