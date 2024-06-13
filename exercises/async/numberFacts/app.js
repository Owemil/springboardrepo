async function randomTrivia() {
    let resp = await axios.get('http://numbersapi.com/random/trivia')
    console.log(resp.data)
}

async function multipleTrivia() {
    let resp = await axios.get('http://numbersapi.com/1..5/trivia')
    console.log(resp.data)
}

async function multipleRequests() {
    let resp = await Promise.all([
        axios.get('http://numbersapi.com/27/trivia'),
        axios.get('http://numbersapi.com/27/trivia'),
        axios.get('http://numbersapi.com/27/trivia'),
        axios.get('http://numbersapi.com/27/trivia')
    ])
    for (indx in resp) {
        console.log(resp[indx])
        let $newLi = $('<li></li>')
        $newLi.text(resp[indx].data)
        $('.numFacts').append($newLi)
    }

}