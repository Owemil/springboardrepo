import React from "react";
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LinkCard from "./LinkCard.js"

const meta = { count: 248 }

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

it("should render (meta)", function () {

    render(
        <MemoryRouter>
            <LinkCard meta={meta} />
        </MemoryRouter>)
})
it("should render (search-Cats)", function () {

    render(
        <MemoryRouter>
            <LinkCard search="Cats" />
        </MemoryRouter>)
})
it("should render (search-Dogs)", function () {
    render(
        <MemoryRouter>
            <LinkCard search="Dogs" />
        </MemoryRouter>)
})
it("should render (search-OtherAnimals)", function () {
    render(
        <MemoryRouter>
            <LinkCard search="Other Animals" />
        </MemoryRouter>)
})
it("should render (search-Organizations)", function () {
    render(
        <MemoryRouter>
            <LinkCard search="Organizations" />
        </MemoryRouter>)
})

it("should match snapshot (meta)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LinkCard meta={meta} />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (search-Cats)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LinkCard search="Cats" />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (search-Dogs)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LinkCard search="Dogs" />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (search-OtherAnimals)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LinkCard search="Other Animals" />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (search-Organizations)", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LinkCard search="Organizations" />
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})

it("should navigate (meta)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <LinkCard meta={meta} />
        </MemoryRouter>
    )

    const card = getByText(/nearby/)

    fireEvent.click(card)

    expect(mockedUsedNavigate).toHaveBeenCalled()
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/search')
})
it("should navigate (search-Cats)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <LinkCard search="Cats" />
        </MemoryRouter>
    )

    const card = getByText("Cats")

    fireEvent.click(card)

    expect(mockedUsedNavigate).toHaveBeenCalled()
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/search/Cats')
})
it("should navigate (search-Dogs)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <LinkCard search="Dogs" />
        </MemoryRouter>
    )

    const card = getByText("Dogs")

    fireEvent.click(card)

    expect(mockedUsedNavigate).toHaveBeenCalled()
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/search/Dogs')
})
it("should navigate (search-OtherAnimals)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <LinkCard search="Other Animals" />
        </MemoryRouter>
    )

    const card = getByText("Other Animals")

    fireEvent.click(card)

    const rabbitCard = getByText("Rabbits")

    fireEvent.click(rabbitCard)

    expect(mockedUsedNavigate).toHaveBeenCalled()
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/search/Rabbits')
})
it("should navigate (search-Organizations)", function () {
    const { getByText } = render(
        <MemoryRouter>
            <LinkCard search="Organizations" />
        </MemoryRouter>
    )

    const card = getByText("Organizations")

    fireEvent.click(card)

    expect(mockedUsedNavigate).toHaveBeenCalled()
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/orgs')
})