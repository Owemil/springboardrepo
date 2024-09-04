import React from "react";

function DogDetails({ dogObj }) {
    console.log(dogObj)
    return (
        <div className="DogDetails">
            <h2>{dogObj.name}</h2>
            <ul>
                <li>Age:{dogObj.age}</li>
                {dogObj.facts.map((fact, idx) => <li key={idx}>{fact}</li>)}
            </ul>
        </div>
    )
}

export default DogDetails