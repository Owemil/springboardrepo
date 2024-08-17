import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import TodoList from "./TodoList";

it("should render", () => {
    render(<TodoList />)
})

it("should match snapshot", () => {
    const { asFragment } = render(<TodoList />)

    expect(asFragment).toMatchSnapshot
})

it("should render w/todos", () => {
    const { queryByText } = render(<TodoList />)

    const todo1 = queryByText("walk dog")
    const todo2 = queryByText("eat breakfast")

    expect(todo1).toBeInTheDocument
    expect(todo2).toBeInTheDocument
})

it("should add new todos", () => {
    const { queryByText, getByLabelText } = render(<TodoList />)

    expect(queryByText("wake up")).not.toBeInTheDocument

    const todoInput = getByLabelText("Add new Todo")
    const submitBtn = queryByText("Submit")

    fireEvent.change(todoInput, { target: { value: "wake up" } })
    fireEvent.click(submitBtn)

    expect(queryByText("wake up")).toBeInTheDocument
})

it("Should remove todos", () => {
    const { queryByText, getByTestId } = render(<TodoList />)

    const div = getByTestId("walk dog")
    const todo1 = queryByText("walk dog")
    const btn = within(div).queryByText("Done")
    expect(todo1).toBeInTheDocument
    fireEvent.click(btn)

    const todo2 = queryByText("eat breakfast")
    expect(todo1).not.toBeInTheDocument
    expect(todo2).toBeInTheDocument
})