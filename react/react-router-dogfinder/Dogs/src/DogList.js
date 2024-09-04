import React from "react";
import { Link } from 'react-router-dom';
import "./DogList.css"

function DogList({ dogList, getDog }) {

    return (
        <div className="DogList" >
            <h1>dogs</h1>
            {dogList.map((dog, idx) => {
                return <div className="dog" key={idx} onClick={getDog}><Link to={`/${dog.name}`} >{dog.name}</Link></div>
            })}
        </div>
    )
}

export default DogList