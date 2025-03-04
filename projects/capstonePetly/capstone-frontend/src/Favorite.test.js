import React from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Favorite from "./Favorite.js"

const user = { data: "I just needed something here" }
const nullUser = null
const addFavPet = jest.fn()
const removeFavPet = jest.fn()
const addFavOrg = jest.fn()
const removeFavOrg = jest.fn()
const setReRender = jest.fn()
const emptyHeart = "\u2661"
const filledHeart = "\u{1F497}"
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

it("should render (pet, not fav)", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)
})
it("should render (pet, fav)", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" currFav={true} />
            </PetlyContext.Provider>
        </MemoryRouter>)
})
it("should render (org, not fav)", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)
})
it("should render (org, fav)", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" currFav={true} />
            </PetlyContext.Provider>
        </MemoryRouter>)
})

it("should match snapshot (pet, not fav)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (pet, fav)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" currFav={true} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (org, not fav)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (org, fav)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" currFav={true} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})

it("should navigate when no user (pet)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: nullUser,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)

    const favDiv = getByText(emptyHeart)

    fireEvent.click(favDiv)

    expect(mockedUsedNavigate).toHaveBeenCalled()
})
it("should navigate when no user (org)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: nullUser,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)

    const favDiv = getByText(emptyHeart)

    fireEvent.click(favDiv)

    expect(mockedUsedNavigate).toHaveBeenCalled()
})

it("should fav when clicked (pet)", async function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)

    const favDiv = getByText(emptyHeart)

    fireEvent.click(favDiv)
    waitFor(() => {
        expect(filledHeart).toBeInTheDocument()
        expect(addFavPet).toHaveBeenCalled()
    })
})
it("should fav when clicked (org)", async function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" />
            </PetlyContext.Provider>
        </MemoryRouter>)

    const favDiv = getByText(emptyHeart)

    fireEvent.click(favDiv)
    waitFor(() => {
        expect(filledHeart).toBeInTheDocument()
        expect(addFavOrg).toHaveBeenCalled()
    })
})

it("should unfav when clicked (pet)", async function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite pet="1" currFav={true} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    const favDiv = getByText(filledHeart)

    fireEvent.click(favDiv)
    waitFor(() => {
        expect(emptyHeart).toBeInTheDocument()
        expect(removeFavPet).toHaveBeenCalled()
    })
})
it("should unfav when clicked (org)", async function () {
    const { getByText } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                addFavPet: addFavPet,
                removeFavPet: removeFavPet,
                addFavOrg: addFavOrg,
                removeFavOrg: removeFavOrg,
                setReRender: setReRender
            }}>
                <Favorite org="1" currFav={true} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    const favDiv = getByText(filledHeart)

    fireEvent.click(favDiv)
    waitFor(() => {
        expect(emptyHeart).toBeInTheDocument()
        expect(removeFavOrg).toHaveBeenCalled()
    })
})