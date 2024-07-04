const fs = require('file-system')
const axios = require('axios')
const argv = process.argv[2]

//function to read/write from file to api call to file
function readFile(path) {
    fs.readFile(path, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err)
        }
        let urls = data.split(/\r?\n/)
        let req = urls.map((url) => axios.get(url))
        console.log(req)
        //get all promises at once
        let out = await Promise.allSettled(req).
            then((results) => results.map(result => {
                if (result.status === 'fulfilled') {
                    return { url: result.value.config.url, data: result.value.data };
                } else {
                    return { status: result.status, host: result.reason.hostname };
                }
            }))

        //write/name files
        for (let obj of out) {
            try {
                let host = new URL(obj.url)

                fs.writeFile(host.host, obj.data, 'utf8', (err) => {
                    if (err) console.log(`can't write to ${host.host}`)
                })
                console.log(`wrote to ${host.host}`)

            } catch (err) {
                console.log(`can't access ${err.hostname}`)
            }

        }


    })

}

readFile(argv)

