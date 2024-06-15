var fs = require('file-system');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            process.kill(1)
        }
        console.log(data)
    })
}

cat(process.argv[2])