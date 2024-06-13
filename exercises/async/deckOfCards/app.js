const deck = {
    async newDeck() {
        let resp = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        this.deckId = resp.data.deck_id

        console.log(resp.data.cards[0].suit)
        console.log(resp.data.cards[0].value)
    },
    async draw() {
        let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)

        console.log(resp.data.cards[0].suit)
        console.log(resp.data.cards[0].value)
    }
}
$('window').ready(async function getDeck(evt) {
    let resp = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    const deckId = resp.data.deck_id

    $(".draw").on("click", async function drawCard(evt) {
        let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

        let remaining = resp.data.remaining

        let suit = resp.data.cards[0].suit
        let value = resp.data.cards[0].value

        let $newLi = $('<li></li>')
        $newLi.text(`${value} of ${suit} with ${remaining} cards remaining `)
        $('.table').append($newLi)
    })
})