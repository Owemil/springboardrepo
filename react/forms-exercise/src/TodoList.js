import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import { v4 as uuid } from 'uuid';

function TodoList() {

    const INITIAL_STATE = [{ Todo: "walk dog" }, { Todo: "eat breakfast" }]
    const [todoList, setTodoList] = useState(INITIAL_STATE)

    const addTodo = (newTodo) => {
        setTodoList(todo => [
            ...todo,
            newTodo
        ]
        )
    }

    return (
        <>
            <h1>Todo List</h1>
            <NewTodoForm addTodo={addTodo} />
            <ul>
                {todoList.map(obj => <Todo todo={obj.Todo} key={uuid()} />)}
            </ul>
        </>
    )
}

export default TodoList