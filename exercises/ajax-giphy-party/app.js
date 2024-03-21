const $inputDiv = $('#input-container')
const $gifDiv = $('#gif-container')
const api_key = '88XrK1QnL8aE892rO8yCTDBG4hLuSxDA'
//event listener for submitting input
$inputDiv.on('click', '.srch-btn', function (event) {
    event.preventDefault()
    searchGif($('.input').val())
    $('.input').val('')
})
//event listener for remove button
$inputDiv.on('click', '.rmv-btn', function (event) {
    event.preventDefault()
    $gifDiv.empty()
})
// function to search giphy api for gifs
async function searchGif(str) {
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', { params: { api_key, q: str } })
    return makeGif(res.data.data[Math.floor(Math.random() * 50)].embed_url)
}
// function for appending gifs to div
function makeGif(url) {
    $('<iframe>')
        .attr('src', url)
        .attr('frameborder', 0)
        .appendTo($gifDiv)
}