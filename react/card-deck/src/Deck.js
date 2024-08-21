import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { v4 as uuid } from "uuid"

function Deck() {
    const [drawnCards, setDrawnCards] = useState([])
    const [deckId, setDeckId] = useState("")
    const [shuffling, setShuffling] = useState(false)
    const newDeck = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    const draw = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    const shuffleDeck = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`

    const tableRef = useRef()

    useEffect(() => {
        async function getDeck() {
            const res = await axios.get(newDeck)
            setDeckId(res.data.deck_id)
        }
        getDeck()

    }, [])

    const handleDraw = () => {
        const drawBtn = document.querySelector('.draw')
        async function drawCard() {
            const res = await axios.get(draw)
            setDrawnCards(oldCards => ([...oldCards, res.data.cards[0].images.png]))
            if (res.data.remaining === 0) alert(`Error: no cards remaining. Please shuffle.`)

        }
        drawCard()
        // setShuffling(!shuffling)
    }

    const handleShuffle = () => {
        setShuffling(!shuffling)

        async function shuffle() {
            const res = await axios.get(shuffleDeck)
            setShuffling(prevShuffle => !prevShuffle)

        }
        shuffle()
        setDrawnCards([])
    }


    return (
        <>
            <button className="draw" type="submit" onClick={handleDraw}>Draw</button>
            {!shuffling ? <button type="submit" onClick={handleShuffle}>Shuffle</button> : <p>Shuffling in Progress...</p>}
            <div className="cardTable" ref={tableRef}>

                {drawnCards.map(img => <Card image={img} key={uuid()} />)}

            </div>

        </>
    )
}

export default Deck