/** BizTime express application. */


const express = require("express");
const companyRoutes = require("./routes/companies")
const invoiceRoutes = require("./routes/invoices")
const industryRoutes = require("./routes/industries")
const app = express();
const middleware = require("./middleware")

app.use(express.json());
// routes
app.use("/companies", companyRoutes)
app.use("/invoices", invoiceRoutes)
app.use("/industries", industryRoutes)

/** general error handler */

app.use(middleware.errorHandler);


module.exports = app;
