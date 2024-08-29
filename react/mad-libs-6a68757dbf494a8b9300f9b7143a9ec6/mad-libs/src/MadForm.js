import React, { useState } from "react";
import MadStory from "./MadStory";
/**
 * MadForm component
 * 
 */
function MadForm() {
    const INITTIAL_STATE = {
        noun: "",
        noun2: "",
        adjective: "",
        color: ""
    }
    // form state
    const [form, setForm] = useState(INITTIAL_STATE)
    // story state
    const [story, setStory] = useState([])
    // state for wether to show story or form
    const [shouldShowStory, setShouldShowStory] = useState(false)
    // standard change function for forms 
    const handleChange = evt => {
        // grab the name and value of the input
        const { name, value } = evt.target
        // update form state with data
        setForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    // function which has minor validation and controls state 
    const addStory = evt => {
        evt.preventDefault()
        if (!form.noun || !form.noun2 || !form.adjective || !form.color) {
            alert(`please fill in all the fields`)
            return
        }
        // add a new obj with story pieces to state
        setStory(oldStory => [...oldStory, form])
        // reset form state
        setForm(INITTIAL_STATE)
        // show story by inverting state
        setShouldShowStory(show => !show)
    }
    // function for emptying story state and showing form
    const reset = () => {
        setStory([])
        setShouldShowStory(show => !show)
    }
    return (
        <div className="madlib-container">
            {shouldShowStory ?
                <MadStory story={story} reset={reset} />
                :
                <form className="madform" >
                    <input
                        required
                        className="madform-noun"
                        type="text"
                        name="noun"
                        placeholder="noun"
                        value={form.noun}
                        onChange={handleChange}
                    />
                    <input
                        required
                        className="madform-noun2"
                        type="text"
                        name="noun2"
                        placeholder="noun2"
                        value={form.noun2}
                        onChange={handleChange}
                    />
                    <input
                        required
                        className="madform-adjective"
                        type="text"
                        name="adjective"
                        placeholder="adjective"
                        value={form.adjective}
                        onChange={handleChange}
                    />
                    <input
                        required
                        className="madform-color"
                        type="text"
                        name="color"
                        placeholder="color"
                        value={form.color}
                        onChange={handleChange}
                    />
                    <button onClick={addStory}>Get Story</button>
                </form>}
        </div>

    )
}

export default MadForm

