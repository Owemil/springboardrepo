import React from "react";
import UseBack from "./UseBack";

function CheezIt({ chanceToDrop = 25 }) {

    return (
        <div className="cheezit-carton">
            {(Math.random() < chanceToDrop / 100) ?
                <p className="cheezit-drop">Oh no they fell</p> :
                <p className="cheezit-gain">Enjoy your snack!</p>}
            <button onClick={UseBack}>Go Back</button>
        </div>
    )
}

export default CheezIt