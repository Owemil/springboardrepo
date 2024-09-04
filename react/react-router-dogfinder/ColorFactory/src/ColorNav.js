import React from "react";
import { NavLink } from "react-router-dom";

function ColorNav() {
    return (
        <nav>
            <p>Welcome to the Color Factory</p>
            <NavLink to="/colors/new">Add a Color</NavLink>
        </nav>
    )
}

export default ColorNav