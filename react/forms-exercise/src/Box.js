import React from "react";
import "./Box.css"


const defaultColors = ["red", "green", "blue", "purple", "brown", "yellow"]
const randColor = Math.floor(Math.random() * defaultColors.length)
function Box({ height, width, backgroundColor }) {

    const handleClick = (e) => {
        e.target.parentElement.remove()
    }

    return (
        <>
            <div
                className="BoxBox"
                data-testid={`${width}_${backgroundColor}`}
                style={{
                    height: `${height}`,
                    width: `${width}`,
                    backgroundColor: `${backgroundColor}`,
                }}>

                <button type="submit" onClick={handleClick}>X</button>
            </div>

        </>
    )
}

export default Box