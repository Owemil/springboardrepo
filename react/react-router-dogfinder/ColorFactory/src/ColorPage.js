import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ColorPage() {
    const { color } = useParams()
    const navigate = useNavigate()
    const lower = color.toLowerCase()
    console.log('hello?')
    console.log(color)
    console.log(color.toLowerCase())
    const handleClick = () => navigate(-1)
    return (
        <>
            <div style={{
                backgroundColor: color,
                height: "200px"
            }}>
                <button onClick={handleClick}>Go Back</button>
            </div>
        </>
    )
}

export default ColorPage