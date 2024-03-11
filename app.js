const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const compression = require('compression')
const port = 3000
const user = require("./routes/user.js")
const tweet = require("./routes/tweet.js")
var morgan = require('morgan')
var responseTime = require('response-time')

const dbConnect = require("./db/db.js")

dbConnect().catch((err) => { console.log(err) })

app.use(responseTime())
app.use(morgan('combined'))
app.use(compression())
app.use(jsonParser)
app.use(express.static("frontend/dist"))
app.use("/api/users", user)
app.use("/api/tweets", tweet)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})