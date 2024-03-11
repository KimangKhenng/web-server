const asyncHandler = require('express-async-handler')
const { tweetModel } = require("../model/tweet.js")

const getTweetById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const tweet = await tweetModel.findById(id)
    res.send(tweet)
})

module.exports = { getTweetById }