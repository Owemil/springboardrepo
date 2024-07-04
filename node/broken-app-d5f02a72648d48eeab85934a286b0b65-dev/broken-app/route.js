const express = require('express');
const axios = require('axios')
const middleware = require('./middleWare')
const router = new express.Router();

// one and only post route for finding devs(users) on github
router.post('/', middleware.dataCheck, async function (req, res, next) {
    //variable for handling Json array of dev names and get requests
    let results = req.body.developers.map(d => {
        return axios.get(`https://api.github.com/users/${d}`)
    });
    //handles the array of promises
    let out = await Promise.allSettled(results).
        then((results) => results.map(result => {
            if (result.status === 'fulfilled') {

                return { name: result.value.data.name, bio: result.value.data.bio }
            } else {
                return { status: result.status, reason: result.reason };
            }
        }));

    //return relevent data in json
    return res.json(out);

});

module.exports = router;

