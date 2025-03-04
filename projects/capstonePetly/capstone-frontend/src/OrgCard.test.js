import React, { useContext } from "react";
import OrgCard from "./OrgCard.js"
import PetlyContext from "./PetlyContext.js";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const user = { favOrgs: [{ orgId: 3 }, { orgId: 2 }] }

const getOrgAnimals = (id, name) => {

}

const org = {
    id: 1,
    attributes: {
        name: "Tacoma Humane Society",
        url: "www.rescue.com",
        email: "contact@email.com",
        citystate: "Tacoma",
        distance: "2.36"

    }
}

const fav = {
    orgId: 2,
    orgName: "Seattle Rescue",
    orgUrl: "www.rescue.com",
    orgContact: "123-456-7890"
}

it("should render without crashing", function () {
    render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                getOrgAnimals: getOrgAnimals

            }}>
                <OrgCard />
            </PetlyContext.Provider>
        </MemoryRouter>)
})

it("matches snapshots", function () {

    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                getOrgAnimals: getOrgAnimals

            }}>
                <OrgCard />
            </PetlyContext.Provider>
        </MemoryRouter>
    )

    expect(asFragment).toMatchSnapshot()
})
it("matches snapshots", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                getOrgAnimals: getOrgAnimals

            }}>
                <OrgCard org={org} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})
it("matches snapshots", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <PetlyContext.Provider value={{
                user: user,
                getOrgAnimals: getOrgAnimals

            }}>
                <OrgCard fav={fav} />
            </PetlyContext.Provider>
        </MemoryRouter>)

    expect(asFragment).toMatchSnapshot()
})

// it("reroutes (org prop)", function () {
//     const { getByText } = render(
//         <MemoryRouter>
//             <PetlyContext.Provider value={{
//                 user: user,
//                 getOrgAnimals: getOrgAnimals

//             }}>
//                 <OrgCard org={org} />
//             </PetlyContext.Provider>
//         </MemoryRouter>)

//     const btn = getByText("See Our Pets!")

//     fireEvent.click(btn)

//     expect(getByText("Rerouted to /Tacoma Humane Society/1/animals")).toBeInTheDocument()
// })

// it("reroutes (fav prop)", function () {
//     const { getByText } = render(
//         <MemoryRouter>
//             <PetlyContext.Provider value={{
//                 user: user,
//                 getOrgAnimals: getOrgAnimals

//             }}>
//                 <OrgCard fav={fav} />
//             </PetlyContext.Provider>
//         </MemoryRouter>)

//     const btn = getByText("See Our Pets!")

//     fireEvent.click(btn)


//     expect(getByText("Rerouted to /Seattle Rescue/2/animals")).toBeInTheDocument()


// })