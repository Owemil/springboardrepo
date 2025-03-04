import React from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Petly from "./Petly.js";

const nearby = [
    {
        id: 1,
        attributes: {
            name: "blossom",
            pictureThumbnailUrl: "wwww.fakepic.com",
        }
    },
    {
        id: 2,
        attributes: {
            name: "bubbles",
            pictureThumbnailUrl: "wwww.fakepic.com",
        }
    },
    {
        id: 3,
        attributes: {
            name: "buttercup",
            pictureThumbnailUrl: "wwww.fakepic.com",
        }
    },
    { count: 12 }
]
const user = { favPets: [{ petId: 1 }, { petId: 2 }] }
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

it("should render", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={nearby} />
            </PetlyContext.Provider>
        </MemoryRouter>)
})
it("should render", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={false} />
            </PetlyContext.Provider>
        </MemoryRouter>)
})

it("should match snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={nearby} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={false} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})

it("should load nearby pets", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={nearby} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(getByText('Blossom')).toBeInTheDocument()
    expect(getByText('Bubbles')).toBeInTheDocument()
    expect(getByText('Buttercup')).toBeInTheDocument()
})
it("should show loader when no nearby pets", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={false} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(getByText('Finding pets...')).toBeInTheDocument()
})

it("should render LinkCards", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={nearby} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(getByText('Cats')).toBeInTheDocument()
    expect(getByText('Dogs')).toBeInTheDocument()
    expect(getByText('Other Animals')).toBeInTheDocument()
    expect(getByText('Organizations')).toBeInTheDocument()
})

it("should navigate when clicked (LinkCards)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: null,
                getAnimal: jest.fn()
            }}>
                <Petly nearby={nearby} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    fireEvent.click(getByText('Cats'))
    expect(mockedUsedNavigate).toHaveBeenCalled()
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/search/Cats')
})