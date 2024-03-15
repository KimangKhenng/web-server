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
const cors = require('cors')
var session = require('express-session')
require('dotenv').config()


const dbConnect = require("./db/db.js")
const passport = require("passport")
const { jwtStrategy } = require("./auth/jwt-strategy.js")
const { googleStrategy } = require("./auth/google-strategy.js")

passport.use(jwtStrategy)
passport.use(googleStrategy)
dbConnect().catch((err) => { console.log(err) })

app.use(session({
    secret: 'dfndfndnfn',
    resave: false,
    saveUninitialized: true
}))
app.use(cors())
app.use(responseTime())
app.use(morgan('combined'))
app.use(compression())
app.use(jsonParser)
// app.use(express.static("frontend/dist"))
app.use("/api/users", passport.authenticate('jwt', { session: false }), user)
app.use("/api/tweets", passport.authenticate('jwt', { session: false }), tweet)
app.use("/api/auth", auth)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})