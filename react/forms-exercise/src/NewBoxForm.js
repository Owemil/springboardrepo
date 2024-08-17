import React, { useState } from "react";

import "./NewBoxForm.css"

function NewBoxForm({ addBox }) {
    const INITIAL_STATE = {
        height: "",
        width: "",
        backgroundColor: "",
    }
    const [formData, setFormData] = useState(INITIAL_STATE)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { height, width, backgroundColor } = formData;
        const newBox = {
            height,
            width,
            backgroundColor
        }
        addBox(newBox)
        setFormData(INITIAL_STATE)
    }
    return (
        <>
            <form className="form">
                <label htmlFor="height">height:</label>
                <input
                    id="height"
                    type="text"
                    name="height"
                    placeholder="200px|1em|1rem etc.."
                    value={formData.height}
                    onChange={handleChange} />
                <label htmlFor="width">width:</label>
                <input
                    id="width"
                    type="text"
                    name="width"
                    placeholder="200px|1em|1rem etc.."
                    value={formData.width}
                    onChange={handleChange} />
                <label htmlFor="backgroundColor">backgroundColor:</label>
                <input
                    id="backgroundColor"
                    type="text"
                    name="backgroundColor"
                    placeholder="pink"
                    value={formData.backgroundColor}
                    onChange={handleChange} />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>

        </>
    )
}

export default NewBoxForm