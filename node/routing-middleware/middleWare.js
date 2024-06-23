const ExpressError = require('./expressError')
const items = require('./fakeDb')
function itemCheck(req, res, next) {
    try {
        let itemNames = items.map(item => item.name)
        console.log(items)
        console.log(itemNames)
        console.log(req.params.name)
        if (itemNames.includes(req.params.name)) {
            return next()
        } else {
            throw new ExpressError(`${req.params.name} does not exist`, 400)
        }

    } catch (err) {
        next(err)
    }
}

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
    itemCheck,
    errorHandler
}