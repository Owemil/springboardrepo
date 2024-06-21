const express = require('express');
const help = require('./helpers')
const app = express();

app.use(express.json());

class ExpressError extends Error {
  constructor(msg, status) {
    super();
    this.msg = msg;
    this.status = status;
    console.error(this.stack)
  }
}


app.get('/mean', function (req, res, next) {
  try {
    console.log(req.query)
    console.log(req.query.nums)
    console.log(req.query.nums.split(","))

    for (const num of req.query.nums.split(",")) {
      console.log(num)
      console.log(typeof (num))
      console.log(Number.isInteger(Number(num)))
      if (!Number.isInteger(Number(num))) {
        throw new ExpressError(`${num} is not a number!`, 404)
      }
    }
    let num = help.mean(req.query.nums.split(",").map((val) => {
      return Number(val)
    }))

    return res.json({ mean: num })
  } catch (err) {
    return next(err)
  }

})
app.get('/median', function (req, res, next) {
  try {
    console.log(req.query)
    console.log(req.query.nums)
    console.log(req.query.nums.split(","))

    for (const num of req.query.nums.split(",")) {
      console.log(num)
      console.log(typeof (num))
      console.log(Number.isInteger(Number(num)))
      if (!Number.isInteger(Number(num))) {
        throw new ExpressError(`${num} is not a number!`, 404)
      }
    }
    let num = help.median(req.query.nums.split(",").map((val) => {
      return Number(val)
    }))

    return res.json({ median: num })
  } catch (err) {
    return next(err)
  }
})
app.get('/mode', function (req, res, next) {
  try {
    console.log(req.query)
    console.log(req.query.nums)
    console.log(req.query.nums.split(","))

    for (const num of req.query.nums.split(",")) {
      console.log(num)
      console.log(typeof (num))
      console.log(Number.isInteger(Number(num)))
      if (!Number.isInteger(Number(num))) {
        throw new ExpressError(`${num} is not a number!`, 404)
      }
    }
    let num = help.mode(req.query.nums.split(",").map((val) => {
      return Number(val)
    }))

    return res.json({ mode: num })
  } catch (err) {
    return next(err)
  }
})

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Errorlet 
  let status = err.status || 500
  console.log(status)
  let message = err.message;


  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
})

app.listen(3000, function () {
  console.log('App on port 3000');
})

module.exports = {
  app
}