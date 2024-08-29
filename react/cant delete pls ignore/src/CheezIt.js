import React from "react";

function CheezIt({ chanceToDrop = 25 }) {

    return (
        <div className="cheezit-carton">
            {(Math.random() < chanceToDrop / 100) ?
                <p className="cheezit-drop">Oh no they fell</p> :
                <p className="cheezit-gain">Enjoy your snack!</p>}
            {/* <button onClick={goBack}>Go Back</button> */}
        </div>
    )
}

export default CheezIt