import React from "react";
import UseBack from "./UseBack";

function Cosmic({ chanceToDrop = 25 }) {

    return (
        <div className="cosmic-carton">
            {(Math.random() < chanceToDrop / 100) ?
                <p className="cosmic-drop">looks like someone stepped on it...</p> :
                <p className="cosmic-gain">Enjoy your snack!</p>}
            <button onClick={UseBack}>Go Back</button>
        </div>
    )
}

export default Cosmic