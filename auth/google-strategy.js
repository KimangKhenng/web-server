var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { userModel } = require("../model/user.js")
const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google"
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = await userModel.findOne({ email: profile.emails[0].value })
        if (!user) {
            //Create new user
            const username = profile.displayName.replace(" ", "")
            const newUser = new userModel({
                username: username,
                email: profile.emails[0].value,
                password: '2wrfew3t3t'
            })
            await newUser.save()
        }
        cb(null, user)
    }
)

module.exports = { googleStrategy }