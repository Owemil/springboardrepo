import React from "react";

function Milk({ chanceToDrop = 25 }) {

    return (
        <div className="milk-carton">
            {(Math.random() < chanceToDrop / 100) ?
                <p className="milk-drop">Oops you dropped it</p> :
                <p className="milk-gain">Enjoy your milk!</p>}
            {/* <button onClick={goBack}>Go Back</button> */}
        </div>
    )
}

export default Milk