const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const compression = require('compression')
const port = 3000
const user = require("./routes/user.js")
const auth = require("./routes/auth.js")
const tweet = require("./routes/tweet.js")
const morgan = require('morgan')
const responseTime = require('response-time')
require('dotenv').config()

const dbConnect = require("./db/db.js")
const { verifyToken } = require("./middleware/index.js")

dbConnect().catch((err) => { console.log(err) })

app.use(responseTime())
app.use(morgan('combined'))
app.use(compression())
app.use(jsonParser)
app.use(express.static("frontend/dist"))
app.use("/api/users", verifyToken, user)
app.use("/api/tweets", verifyToken, tweet)
app.use("/api/auth", auth)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})