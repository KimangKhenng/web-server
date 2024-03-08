const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: String,
    age: Number,
    nameInKhmer: String
})

exports.userModel = mongoose.model("userModel", userSchema)

