import React, { useState } from "react";


function NewTodoForm({ addTodo }) {
    const INITIAL_STATE = {
        Todo: ""
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
        e.preventDefault()
        addTodo(formData)
        setFormData(INITIAL_STATE)
    }

    return (
        <>
            <form>
                <label htmlFor="Todo">Add new Todo</label>
                <input
                    id="Todo"
                    type="text"
                    name="Todo"
                    placeholder="Walk dog"
                    value={formData.Todo}
                    onChange={handleChange} />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}

export default NewTodoForm