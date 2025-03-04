import React from "react";
import AnimalCard from "./AnimalCard";
import LinkCard from "./LinkCard";
import { NavLink } from "react-router-dom";
import "./Petly.css"

// Petly component takes in nearby pet data 
// it renders the homepage, linkcards, and nearby animals

function Petly({ nearby }) {

    const initialCards = ["Cats", "Dogs", "Other Animals", "Organizations"]

    return (
        <>
            <div className="petly-header">
                <h1>Find your new best friend!</h1>
                <p>Browse thousands of adoptable pets from shelters and rescues.</p>
            </div>

            < div className="lc-container" >
                {initialCards.map((c, idx) => {
                    return (c === "other animals") ?
                        <div className={`lc-div`} key={idx}>
                            <LinkCard search={c} />
                        </div>
                        :
                        <div className={`lc-div`} key={idx}>
                            <LinkCard search={c} />
                        </div>
                })}
            </div >

            <h3 className="nearby-banner">
                Pets available for Adoption Nearby
            </h3>

            <div className="nearby">
                {nearby ? nearby.map(animal => {
                    if (animal.attributes) {
                        return (
                            <div className="animal-card" key={animal.id}>
                                <AnimalCard nearby={animal.attributes} id={animal.id} />
                            </div>
                        )
                    } else {
                        return (
                            <div className="link-card" key={animal.id + 1} >
                                <LinkCard meta={animal} />
                            </div>
                        )


                    }
                })
                    : <p>Finding pets...</p>}



            </div>

        </>
    )
}

export default Petly