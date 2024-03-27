
let categories = [];
let randomCats = []

//returns a new array of randomly chosen ids
function getCategoryIds() {
    return randomCats.map((val) => val.id)
}

//iterates through the random ids to call the api and get the subject title and q&a's then makes and obj from them
async function getCategory(catIds) {
    for (id of catIds) {
        let res = await axios.get('https://rithm-jeopardy.herokuapp.com/api/category', { params: { id: `${id}` } })
        const title = res.data.title
        const clues = res.data.clues
        categories.push({ title, clues })
    }
}

//fills jeopardy table with subject titles, question, answers and ?
function fillTable() {
    $('#restartBtn').after('<table id="jeopardy"> <thead><tr id="titles"></thead> <tbody id="questions"><tr class="0"><tr class="1"><tr class="2"><tr class="3"><tr class="4"></tbody> </table>')
    categories.forEach(function (val, idx) {
        $('#titles').append(`<th>${val.title}</th>`)
        for (const [i, v] of val.clues.entries()) {
            if ($(`.${i}`).hasClass(`${i}`)) {
                $(`.${i}`).append(`<td id="${idx}-${i}"><img class="img" src="7493.png"><p class="hidden question">${v.question}</p><p class="hidden answer">${v.answer}</p></td>`)
                $(`#${idx}-${i}`).css('background-color', '#060ce9')
            }
        }
    })
}

// handling click events on the jeopardy board
function handleClick(e) {
    $('#questions').on('click', (e) => {
        const parent = e.target.parentElement
        const parentId = parent.getAttribute('id')
        if ($(e.target).hasClass('hidden') || $(e.target).hasClass('img')) {
            $(e.target).next().removeClass('hidden')
            $(e.target).remove()
        } else if ($(e.target).hasClass('question')) {
            $(e.target).next().removeClass('hidden')
            $(e.target).remove()
            $(`#${parentId}`).css('background-color', '#28a200')
        }
    })
}
// function to deal with buttons and loading spinner
function showLoadingView() {
    if ($('#restartBtn')) {
        $('#restartBtn').remove()
    }
    $('#startBtn').remove()
    $('#nameBanner').after('<div class="loader"></div>')

}
//hides loading spinner and handles restart button
function hideLoadingView() {
    $('.loader').remove()
    $('#nameBanner').after('<button id="restartBtn">Restart</button>')
    fillTable()
    handleClick()
    $('#restartBtn').on('click', (e) => {
        $('#jeopardy').remove()
        categories = []
        randomCats = []
        showLoadingView()
        setupAndStart()
        setTimeout(hideLoadingView, 1200)

    })
}
// function calls api and get 6 random questions then calls getCategoryIds to map out the ids of q/a obj then getCategory to make a new object {title:subject [array with q/a]}
async function setupAndStart() {
    const res = await axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=100')
    const random6 = _.sampleSize(res.data, 6)
    randomCats.push(...random6)
    getCategoryIds()
    getCategory(getCategoryIds())
}
//on window load event listener to add title and button
window.addEventListener('load', (e) => {

    $('body')
        .prepend($('<button id="startBtn">Start</button>'))
        .prepend($('<h1 id="nameBanner">Jeopardy!</h1>'))

    setupAndStart()

})
// start button event listener
$('body').on('click', '#startBtn', (e) => {
    showLoadingView()
    setTimeout(hideLoadingView, 1200)

})



