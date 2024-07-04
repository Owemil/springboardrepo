const express = require('express');
const middleware = require('./middleWare')
const route = require("./route")
const app = express();

app.use(express.json());

app.use("/dev", route)

app.use(middleware.errorHandler)

module.exports = app;