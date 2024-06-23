const express = require('express')
const morgan = require('morgan')
const middleware = require('./middleWare')
const itemRoutes = require('./itemRoutes')
const app = express()

app.use(express.json())
app.use(morgan('dev'))



app.use('/items', itemRoutes)


app.use(middleware.errorHandler)

module.exports = app;