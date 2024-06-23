const express = require("express");
const items = require('./fakeDb')
const middleware = require('./middleWare')
const router = new express.Router();

router.get('/', function (req, res, next) {
    return res.json(items)
})

router.post('/', function (req, res, next) {
    const newItem = { 'name': req.body.name, 'price': req.body.price }

    items.push(newItem)

    return res.status(201).json({ 'Added!': newItem })
})

router.get('/:name', middleware.itemCheck, function (req, res, next) {
    const item = items.filter(item => item.name === req.params.name)
    return res.json(item)
})

router.patch('/:name', middleware.itemCheck, function (req, res, next) {
    const item = items.filter(item => item.name === req.params.name)

    if (req.body.name) {
        item[0].name = req.body.name
    }
    if (req.body.price) {
        item[0].price = req.body.price
    }
    return res.json({ 'Updated': item[0] })
})

router.delete('/:name', middleware.itemCheck, function (req, res, next) {

    const idx = items.findIndex(item => item.name === req.params.name)
    items.splice(idx, 1);
    return res.json({ message: "Deleted" })

})

module.exports = router;