import React from "react";
import Login from "./Login.js"
import { fireEvent, render, waitFor } from "@testing-library/react";

const login = (evt, route, form) => {
    console.log(form)
}

it("renders without crashing", function () {
    render(<Login />)
})

it("matches snapshot", function () {
    const { asFragment } = render(<Login login={login} />)

    expect(asFragment).toMatchSnapshot()
})

it("Logs in", async function () {
    const { getByText, getByLabelText } = render(<Login login={login} />)

    const username = getByLabelText("Username")
    const password = getByLabelText("Password")
    const btn = getByText("Login")

    fireEvent.change(username, { target: { value: 'jtest' } })
    expect(username).toHaveValue("jtest")
    fireEvent.change(password, { target: { value: 'password' } })
    expect(password).toHaveValue("password")

    fireEvent.click(btn)

    await waitFor(() => {
        expect(username).toHaveValue("")
        expect(password).toHaveValue("")
    })
})

it("fails with empty login ", async function () {
    const { getByText } = render(<Login login={login} />)

    const btn = getByText("Login")

    fireEvent.click(btn)

    await waitFor(() => {
        expect(getByText("Username is required")).toBeInTheDocument()
        expect(getByText("Password is required")).toBeInTheDocument()
    })
})