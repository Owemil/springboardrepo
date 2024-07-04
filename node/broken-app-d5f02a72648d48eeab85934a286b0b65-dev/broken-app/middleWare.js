const ExpressError = require('./expressError')
//middleware function for checking if proper data was sent
function dataCheck(req, res, next) {
    try {
        if (req.body.developers) {
            return next()
        } else {
            throw new ExpressError(`please send data in JSON format {'developers:[{name,..}]}`, 400)
        }

    } catch (err) {
        next(err)
    }
}
// general error handler
function errorHandler(err, req, res, next) {
    let status = err.status || 500

    return res.status(status).json({
        error: {
            message: err.message,
            status: err.status
        }
    })
}

module.exports = {
    dataCheck,
    errorHandler
}