let fs = require('file-system');
let axios = require('axios')
let data = process.argv[2]

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(URL) {
    try {
        let resp = await axios.get('https://google.com')
        console.log(resp.data);
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit(1);
    }

}

if (data.includes('http')) {
    webCat(data)
} else {
    cat(process.argv[2])
}