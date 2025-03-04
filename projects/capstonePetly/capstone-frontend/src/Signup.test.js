import React from "react";
import Signup from "./Signup.js"
import { fireEvent, render, waitFor } from "@testing-library/react";

const signup = (evt, route, form) => {
    console.log(form)
}

it("renders without crashing", function () {
    render(<Signup />)
})

it("matches snapshot", function () {
    const { asFragment } = render(<Signup signup={signup} />)

    expect(asFragment).toMatchSnapshot()
})

it("submits", async function () {
    const { getByText, getByLabelText } = render(<Signup signup={signup} />)
    const username = getByLabelText("Username")
    const password = getByLabelText("Password")
    const firstName = getByLabelText("First Name")
    const lastName = getByLabelText("Last Name")
    const email = getByLabelText("Email")
    const zipCode = getByLabelText("Zip Code")
    const btn = getByText("Signup")

    fireEvent.change(username, { target: { value: "jtest" } })

    expect(username).toHaveValue("jtest")
    fireEvent.change(password, { target: { value: "password" } })
    expect(password).toHaveValue("password")
    fireEvent.change(firstName, { target: { value: "johnny" } })
    expect(firstName).toHaveValue("johnny")
    fireEvent.change(lastName, { target: { value: "test" } })
    expect(lastName).toHaveValue("test")
    fireEvent.change(email, { target: { value: "jtest@test.com" } })
    expect(email).toHaveValue("jtest@test.com")
    fireEvent.change(zipCode, { target: { value: "11111" } })
    expect(zipCode).toHaveValue("11111")

    fireEvent.click(btn)

    await waitFor((() => {
        expect(username).toHaveValue("")
        expect(password).toHaveValue("")
        expect(firstName).toHaveValue("")
        expect(lastName).toHaveValue("")
        expect(email).toHaveValue("")
        expect(zipCode).toHaveValue("")
    }))
})

it("fails with no input values", async function () {
    const { getByText } = render(<Signup signup={signup} />)

    const btn = getByText("Signup")

    fireEvent.click(btn)

    await waitFor(() => {

        expect(getByText("Username is required")).toBeInTheDocument()
        expect(getByText("Password is required")).toBeInTheDocument()
        expect(getByText("First Name is required")).toBeInTheDocument()
        expect(getByText("Last Name is required")).toBeInTheDocument()
        expect(getByText("Email is required")).toBeInTheDocument()
    })
})

it("fails with poor input values", async function () {
    const { getByText, getByLabelText } = render(<Signup signup={signup} />)
    const username = getByLabelText("Username")
    const password = getByLabelText("Password")
    const firstName = getByLabelText("First Name")
    const lastName = getByLabelText("Last Name")
    const email = getByLabelText("Email")
    const zipCode = getByLabelText("Zip Code")
    const btn = getByText("Signup")

    fireEvent.change(username, { target: { value: "jtesterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" } })
    expect(username).toHaveValue("jtesterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    fireEvent.change(password, { target: { value: "passw" } })
    expect(password).toHaveValue("passw")
    fireEvent.change(firstName, { target: { value: "johnny" } })
    expect(firstName).toHaveValue("johnny")
    fireEvent.change(lastName, { target: { value: "test" } })
    expect(lastName).toHaveValue("test")
    fireEvent.change(email, { target: { value: "jtest(AT)test(DOT)com" } })
    expect(email).toHaveValue("jtest(AT)test(DOT)com")
    fireEvent.change(zipCode, { target: { value: "11111" } })
    expect(zipCode).toHaveValue("11111")

    fireEvent.click(btn)

    await waitFor((() => {
        expect(getByText("Username must be 25 characters or less")).toBeInTheDocument()

        expect(getByText("Password must be at least 6 characters")).toBeInTheDocument()

        expect(getByText("Invalid email address")).toBeInTheDocument()

    }))
})