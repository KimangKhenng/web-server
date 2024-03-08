const model = require("../model/user.js")
const asyncHandler = require('express-async-handler')
const userModel = model.userModel

exports.getAllUsers = (async (req, res) => {
    const users = await userModel.find({}).exec()
    res.send(users)
})

exports.getUserById = (async (req, res) => {
    let user = await userModel.findById(req.params.id).exec()
    res.send(user)
})

exports.deleteById = (async (req, res) => {
    const result = await userModel.deleteOne({ _id: req.params.id })
    res.send(result)
})

exports.createUser = (asyncHandler(async (req, res) => {
    const newUser = new userModel(req.body)
    const result = await newUser.save()
    res.send(result)
}))