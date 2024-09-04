import React from "react";
import { NavLink } from "react-router-dom";
import "./DogNav.css"

function DogNav({ names, getDog }) {
    console.log(names)
    return (
        <nav>
            {names.map((name, idx) => <div className="dog-nav" onClick={getDog}><NavLink to={`/${name}`} key={idx} >{name}</NavLink></div>)}

        </nav>

    )
}

export default DogNav