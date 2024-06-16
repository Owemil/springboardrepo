/** Command-line tool to generate Markov text. */
const fs = require('file-system');
const axios = require('axios')
const markov = require("./markov")
const value = process.argv[2]

function randText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error: ${err}`)
            process.kill(1)
        }
        let newMM = new markov.MarkovMachine(data)
        console.log(newMM.makeText())

    })
}

async function randWebText(URL) {
    try {
        let resp = await axios.get(URL)
        console.log(resp.data);
        let newMM = new markov.MarkovMachine(resp.data)
        console.log(newMM.makeText())
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit(1);
    }

}

if (value.includes('http')) {
    randWebText(value)
} else {
    randText(value)
}