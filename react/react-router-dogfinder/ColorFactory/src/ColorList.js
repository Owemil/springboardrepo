import React from "react";
import { Link } from "react-router-dom";
import { GetColorName } from 'hex-color-to-color-name';
import "./ColorList.css"

function ColorList({ colors }) {
    return (
        <div >
            <p>Please select a color</p>
            {colors.map((color, idx) => <Link to={`/colors/${GetColorName(color)}`} key={idx} className="ColorLink">{GetColorName(color)}</Link>)}
        </div>
    )
}

export default ColorList