import React from "react";

function Todo({ todo }) {

    const handleClick = (e) => {
        e.target.parentElement.remove()
    }

    return (
        <>
            <div data-testid={todo}>
                <li>{todo}</li>
                <button name={`${todo}-btn`} onClick={handleClick}>Done</button>
            </div>
        </>
    )
}

export default Todo