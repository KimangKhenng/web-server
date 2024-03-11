const { userModel } = require("../model/user.js")
const { tweetModel } = require("../model/tweet.js")
const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const getAllUsers = (async (req, res) => {
    const users = await userModel.find({}).exec()
    res.send(users)
})

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
    const newUser = new userModel(req.body)
    const result = await newUser.save()
    res.send(result)
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
    getTweetsByUserId
}