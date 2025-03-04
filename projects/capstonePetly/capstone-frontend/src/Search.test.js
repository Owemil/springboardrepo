import React, { act } from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate, useParams } from "react-router-dom";
import Search from "./Search.js";


const otherFilters = {
    filterSet: new Set(["Barnyard", "Reptile", "Small & Furry", "Scales, Shells & Other"]),
    scalesshellsother: ["Fish", "Frogs", "Turtles", "Tortoises",],
    reptile: ["Geckos", "Iguanas", "Snakes", "Lizards"],
    smallfurry: ["Chinchillas", "Ferrets", "Gerbils", "Hamsters", "Mice", "Rats",],
    barnyard: ["Chickens", "Cows", "Donkeys", "Ducks", "Geese", "Goats", "Pigs", "Ponies", "Turkeys",]
}
const nullFilter = {
    data: false,
    meta: {
        count: 0,
        pages: 1,
        pageReturned: 1
    }
}
const filter = jest.fn()
// filter.mockReturnValue()
const slugify = jest.fn()
const mockedUseParams = jest.fn(() => {
    const species = "Dogs"
    return species
})
const mockedUseNavigate = jest.fn();
jest.mock('./Search.js', () => ({
    ...jest.requireActual('./Search.js'),
    filter
}))
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => mockedUseParams,
    useNavigate: () => mockedUseNavigate,
}));

it("should render", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                filter: filter,
                otherFilters: otherFilters,
                slugify: slugify

            }}>
                <Search />
            </PetlyContext.Provider>
        </MemoryRouter>)

})


it("should match snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                filter: filter,
                otherFilters: otherFilters,
                slugify: slugify

            }}>
                <Search />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(asFragment).toMatchSnapshot()
})