import React from "react";
import PetlyContext from "./PetlyContext.js";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AnimalCard from "./AnimalCard.js";

const user = { favPets: [{ petId: 1 }, { petId: 2 }] }
const nearby = {
    name: "bubbles",
    pictureThumbnailUrl: "wwww.fakepic.com",
}
const search = {
    name: "tipsy",
    pictureThumbnailUrl: "wwww.fakepic.com",
    ageGroup: "young",
    breedPrimary: "pomeranian",
    distance: "2.66"
}
const fav = {
    petId: 2,
    petName: "dj",
    petPic: "wwww.fakepic.com"
}

const getAnimal = jest.fn()

it("should render without crashing (nearby)", function () {
    render(<MemoryRouter>
        <PetlyContext.Provider value={{
            user: user,
            getAnimal: getAnimal
        }}>
            <AnimalCard nearby={nearby} id="2" />
        </PetlyContext.Provider>
    </MemoryRouter>)
})
it("should render without crashing (search)", function () {
    render(<MemoryRouter>
        <PetlyContext.Provider value={{
            user: user,
            getAnimal: getAnimal
        }}>
            <AnimalCard search={search} id="3" />
        </PetlyContext.Provider>
    </MemoryRouter>)
})
it("should render without crashing (fav)", function () {
    render(<MemoryRouter>
        <PetlyContext.Provider value={{
            user: user,
            getAnimal: getAnimal
        }}>
            <AnimalCard fav={fav} />
        </PetlyContext.Provider>
    </MemoryRouter>)
})

it("should match snapshot (nearby)", function () {
    const { asFragment } = render(<MemoryRouter>
        <PetlyContext.Provider value={{
            user: user,
            getAnimal: getAnimal
        }}>
            <AnimalCard nearby={nearby} id="2" />
        </PetlyContext.Provider>
    </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (search)", function () {
    const { asFragment } = render(<MemoryRouter>
        <PetlyContext.Provider value={{
            user: user,
            getAnimal: getAnimal
        }}>
            <AnimalCard search={search} id="3" />
        </PetlyContext.Provider>
    </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("should match snapshot (fav)", function () {
    const { asFragment } = render(<MemoryRouter>
        <PetlyContext.Provider value={{
            user: user,
            getAnimal: getAnimal
        }}>
            <AnimalCard fav={fav} />
        </PetlyContext.Provider>
    </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
