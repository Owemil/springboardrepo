// PROBLEMS 1 AND 2
// axios
//     .get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//     .then(resp => {
//         const suit = resp.data.cards[0].suit
//         const value = resp.data.cards[0].value
//         let deckAmt = resp.data.remaining
//         let deck_id = resp.data.deck_id
//         console.log(resp)
//         console.log(resp.data)

//         console.log(deckAmt)
//         console.log(`${value} of ${suit}`)
//         return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//     })
//     .then(resp => {
//         const suit = resp.data.cards[0].suit
//         const value = resp.data.cards[0].value
//         let deckAmt = resp.data.remaining
//         console.log(resp)
//         console.log(resp.data)
//         console.log(deckAmt)
//         console.log(`${value} of ${suit}`)
//     })
//     .catch(err => {
//         console.log(`Error : ${err}`)
//     })
// PROBLEMS 1 AND 2

axios
    .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => {

        let deck_id = resp.data.deck_id

        $('.draw').on('click', (evt) => {
            axios
                .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
                .then(resp => {
                    const suit = resp.data.cards[0].suit
                    const value = resp.data.cards[0].value
                    let deckAmt = resp.data.remaining
                    console.log(resp)
                    console.log(resp.data)
                    console.log(evt.target)
                    let $newLi = $("<li></li>")
                    $newLi.text(`${value} of ${suit} 
                        Remaining:${deckAmt}`)
                    $(".table").append($newLi)
                })
        })
    })

