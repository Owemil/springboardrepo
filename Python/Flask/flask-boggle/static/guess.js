const $input = $('.guessInput')
const $gameBox = $('#game-container')
let score = 0
let $inputVal = $input.val()

$('.guessBtn').on('click', async (evt) => {
    evt.preventDefault()
    console.log(evt)
    console.log(evt.target)
    await sendGuess($input.val())
})

async function sendGuess(guess) {
    const res = await axios.post('/guess', { guess: guess })
    console.log(res)
    console.log(res.data)
    console.log(JSON.stringify(res.data))
    postResult(JSON.stringify(res.data))
}

function postResult(obj) {
    newObj = obj.replace(/[^a-zA-Z0-9: ]/g, " ")
    $('.result').remove()
    console.log(newObj)
    let $resultDiv = $(`<div class="result"><p>${newObj}</p></div>`)
    $gameBox.append($resultDiv)
    handleScore(newObj)
    $input.val('')
}

function handleScore(data) {
    console.log(score)
    console.log(data.trim())
    // console.log(data.replace(/[^a-zA-Z0-9: ]/g, ""))
    // newData = data.replace(/[^a-zA-Z0-9: ]/g, "")
    if (data.trim() == "result : ok") {
        score += $input.val().length
        console.log(score)
        $('#score').text(score)
    }
}

$('window').on('load', Timer1 = setInterval(async () => {
    $('#seconds').text($('#seconds').text() - 1)
    if ($('#seconds').text() == 0) {
        clearInterval(Timer1)
        await postScore()
        $('#guess').remove()

    }

}, 1000))

async function postScore() {
    const res = await axios.post('/post-score', { score: $('#score').text(), played: 'True' })
    console.log(res)
    console.log(res.data)
}

async function restart() {
    const res = await axios.get('/')
    console.log(res)
}