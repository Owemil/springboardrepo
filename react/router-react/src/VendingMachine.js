import React from "react";
import { Link } from "react-router-dom";

function VendingMachine() {

    return (
        <div className="vm">

            <div className="vm-speak">
                <p>Please choose a snack from our vending machine</p>
            </div>
            <div className="vm-links">
                <Link to="/cheezit">CheezIt</Link>
                <Link to="/cosmic">Cosmic Brownie</Link>
                <Link to="/milk"> Milk</Link>
            </div>
        </div>
    )
}

export default VendingMachine