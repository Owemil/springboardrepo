import React, { act } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar.js";


const user = { firstName: "Johnny" }
const nullUser = null
const otherFilters = {
    filterSet: new Set(["Barnyard", "Reptile", "Small & Furry", "Scales, Shells & Other"]),
    scalesshellsother: ["Fish", "Frogs", "Turtles", "Tortoises",],
    reptile: ["Geckos", "Iguanas", "Snakes", "Lizards"],
    smallfurry: ["Chinchillas", "Ferrets", "Gerbils", "Hamsters", "Mice", "Rats",],
    barnyard: ["Chickens", "Cows", "Donkeys", "Ducks", "Geese", "Goats", "Pigs", "Ponies", "Turkeys",]
}
const logout = jest.fn()
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


it("should render user", function () {
    render(
        <MemoryRouter>
            <NavBar logout={logout} user={user} other={otherFilters} />
        </MemoryRouter>)
})
it("should render nullUser", function () {
    render(
        <MemoryRouter>
            <NavBar logout={logout} user={nullUser} other={otherFilters} />
        </MemoryRouter>)
})

it("should match snapshot user", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <NavBar logout={logout} user={user} other={otherFilters} />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot nullUser", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <NavBar logout={logout} user={nullUser} other={otherFilters} />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})

it("should show login/signup when no user", function () {

    const { getByText } = render(
        <MemoryRouter>
            <NavBar logout={logout} user={nullUser} other={otherFilters} />
        </MemoryRouter>)
    expect(getByText('Login')).toBeInTheDocument()
    expect(getByText('Signup')).toBeInTheDocument()
})
it("should show logout/my account when user", function () {

    const { getByText } = render(
        <MemoryRouter>
            <NavBar logout={logout} user={user} other={otherFilters} />
        </MemoryRouter>)
    expect(getByText('Log out')).toBeInTheDocument()
    expect(getByText('My Account')).toBeInTheDocument()
})
it("should show guest msg when no user", function () {

    const { getByText } = render(
        <MemoryRouter>
            <NavBar logout={logout} user={nullUser} other={otherFilters} />
        </MemoryRouter>)

    fireEvent.click(getByText('Search'))

    expect(getByText('Welcome, Guest')).toBeInTheDocument()
})
it("should show user msg when user", function () {

    const { getByText } = render(
        <MemoryRouter>
            <NavBar logout={logout} user={user} other={otherFilters} />
        </MemoryRouter>)

    fireEvent.click(getByText('Search'))

    expect(getByText('Welcome Back, Johnny')).toBeInTheDocument()
})  
