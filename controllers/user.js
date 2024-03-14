const { userModel } = require("../model/user.js")
const { tweetModel } = require("../model/tweet.js")
const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const getAllUsers = (async (req, res) => {
    const users = await userModel.find({}).exec()
    res.send(users)
})

const googleLogin = (asyncHandler(async (req, res) => {

}))

const handleGoogleLogin = (asyncHandler(async (req, res) => {
    // Create user if not in our system
    console.log(req.user)
    console.log("Hello")
    res.status(201).json({ hello: "Hello" })
}))

const getTweetsByUserId = (asyncHandler(async (req, res) => {
    const id = req.params.id
    const users = await userModel.findById(id).populate('tweets').select('tweets')
    res.send(users)
}))

const getUserById = (async (req, res) => {
    let user = await userModel.findById(req.params.id).exec()
    res.send(user)
})

const deleteById = (async (req, res) => {
    const result = await userModel.deleteOne({ _id: req.params.id })
    res.send(result)
})

const createUser = (asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({
        username: username,
        email: email,
        password: hashedPassword
    })
    const result = await newUser.save()
    result.password = ''
    res.send(result)
}))

const loginUser = (asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({
        email: email
    })
    //Compare password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ error: "Password or email incorrect!" })
    }
    //Return JWT to client
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, process.env.SECRET, {
        expiresIn: '24h',
        issuer: 'api.tfdevs.com',
        audience: 'www.tfdevs.com'
    })
    return res.status(200).json({ token })
}))

const updateById = (asyncHandler(async (req, res) => {
    const id = req.params.id
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true
    })
    res.send(updatedUser)
}))

module.exports = {
    getAllUsers,
    getUserById,
    deleteById,
    createUser,
    updateById,
    getTweetsByUserId,
    loginUser,
    googleLogin,
    handleGoogleLogin
}