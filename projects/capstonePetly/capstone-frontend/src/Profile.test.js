import React from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile.js"

const user = {
    username: "jtest",
    firstName: "johnny",
    lsatName: "test",
    email: "test@email.com",
    zipCode: "11111",
    favPets: [{
        petId: 2,
        petName: "dj",
        petPic: "wwww.fakepic.com"
    }],
    favOrgs: [{
        orgId: 1,
        orgName: "Tacoma Humane Society",
        orgUrl: "www.rescue.com",
        orgContact: "contact@email.com"
    }]
}
const nullUser = null
const update = jest.fn()


it("should render", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={user}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )
})
it("should render nullUser", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{ user: nullUser }}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )
})

it("should match snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={user}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot nullUser", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{ user: nullUser }}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(asFragment).toMatchSnapshot()
})

it("should load user info", function () {
    const { getByLabelText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{ user: user }}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    const username = getByLabelText("Username")
    const firstName = getByLabelText("First Name")
    const lastName = getByLabelText("Last Name")
    const email = getByLabelText("Email")
    const zipCode = getByLabelText("Zip Code")

    waitFor(() => {
        expect(username).toHaveValue('jtest')
        expect(firstName).toHaveValue('johnny')
        expect(lastName).toHaveValue('test')
        expect(email).toHaveValue('test@email.com')
        expect(zipCode).toHaveValue('11111')
    })


})

it("should load favPets", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{ user: user }}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    const pets = getByText('Fav Pets')
    fireEvent.click(pets)
    const fav = getByText('dj')
    expect(fav).toBeInTheDocument()
})


it("should load favOrgs", function () {
    const { getByText, getAllByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{ user: user }}>
                <Profile update={update} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    const orgs = getByText('Fav Orgs')
    fireEvent.click(orgs)
    const fav = getAllByText('Tacoma Humane Society')
    expect(fav.length).toBe(2)
})
