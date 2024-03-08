function auth(req, res, next) {
    console.log("This is middleware!")
    next()
}

exports.auth = auth