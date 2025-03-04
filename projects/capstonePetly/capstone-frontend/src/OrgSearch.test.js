import React from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrgSearch from "./OrgSearch.js";

const search = jest.fn()
const locData = { zip: "testZip" }


it("should render", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getOrgAnimals: jest.fn()
            }}>
                <OrgSearch search={search} locData={locData} />
            </PetlyContext.Provider>
        </MemoryRouter>)
})

it("should match snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getOrgAnimals: jest.fn()
            }}>
                <OrgSearch search={search} locData={locData} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})

it("should send search form", function () {
    const { getByPlaceholderText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getOrgAnimals: jest.fn()
            }}>
                <OrgSearch search={search} locData={locData} />
            </PetlyContext.Provider>
        </MemoryRouter>)
    const nameInput = getByPlaceholderText("Name, full or partial")
    fireEvent.change(nameInput, { target: { value: 'Blossoms Beagles' } })
    expect(nameInput).toHaveValue('Blossoms Beagles')
    expect(search).toHaveBeenCalled()
})

it("should render loader", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getOrgAnimals: jest.fn()
            }}>
                <OrgSearch search={search} locData={locData} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    const loadingText = getByText(/Loading/)
    expect(loadingText).toBeInTheDocument()
})