import React from "react";

function Card({ image }) {


    return (
        <div>
            <img
                src={image}
                style={{
                    position: "absolute",
                    top: "50px",
                    left: "370px"

                }} />
        </div>
    )
}

export default Card