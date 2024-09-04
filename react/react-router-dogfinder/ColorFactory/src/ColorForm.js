import React from "react";
import { GetColorName } from 'hex-color-to-color-name';

function ColorForm({ color, change, click }) {
    const colorName = GetColorName(color)
    return (
        <div>
            <h1>{color}/{colorName}</h1>

            <form>
                <input
                    type="color"
                    id="color"
                    name="color"
                    value={color}
                    onChange={change} />
                <button onClick={click}>Submit</button>
            </form>
        </div>


    )
}

export default ColorForm