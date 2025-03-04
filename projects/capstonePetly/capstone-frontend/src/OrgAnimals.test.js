import React from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import OrgAnimals from "./OrgAnimals.js";

const animals = {
    animals: [
        {
            id: 1,
            attributes: {
                name: "blossom",
                pictureThumbnailUrl: "wwww.fakepic.com",
                ageGroup: "young",
                breedPrimary: "Collie",
            }
        },
        {
            id: 2,
            attributes: {
                name: "bubbles",
                pictureThumbnailUrl: "wwww.fakepic.com",
                ageGroup: "young",
                breedPrimary: "Golden Retriever",
            }
        },
        {
            id: 3,
            attributes: {
                name: "buttercup",
                pictureThumbnailUrl: "wwww.fakepic.com",
                ageGroup: "young",
                breedPrimary: "Pit Bull",
            }
        },

    ],
    meta: {
        count: 3,
        pages: 1,
        pageReturned: 1
    }
}
const nullAnimals = {
    animals: false,
    meta: {
        count: 0,
        pages: 1,
        pageReturned: 1
    }
}
const getAnimals = jest.fn()
const mockedUseParams = jest.fn(() => {
    const orgName = 'seattle animal sanctuary'
    const id = 123456
    return orgName, id
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => mockedUseParams,
}));

it("should render", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <OrgAnimals animals={animals} getAnimals={getAnimals} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )
})

it("should match snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <OrgAnimals animals={animals} getAnimals={getAnimals} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(asFragment).toMatchSnapshot()
})

it("should render animals", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <OrgAnimals animals={animals} getAnimals={getAnimals} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(getByText('Blossom')).toBeInTheDocument()
    expect(getByText('Bubbles')).toBeInTheDocument()
    expect(getByText('Buttercup')).toBeInTheDocument()
})
it("should render loader (no animals)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <OrgAnimals animals={nullAnimals} getAnimals={getAnimals} />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(getByText(/loading/)).toBeInTheDocument()
})