const ExpressError = require("./expressError")
// error handler
function errorHandler(err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err
    });
}


module.exports = {
    errorHandler
}