import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar() {

    return (
        <nav className="navBar">
            <NavLink to="/cheezit">Cheezit</NavLink>
            <NavLink to="/cosmic">Cosmic Brownie</NavLink>
            <NavLink to="/milk">Milk</NavLink>
        </nav>
    )
}

export default NavBar