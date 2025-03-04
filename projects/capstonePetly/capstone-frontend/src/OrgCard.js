import React, { useContext } from "react";
import { Card, CardBody, CardTitle, List, ListGroupItem, NavLink, Button, Nav, Spinner } from "reactstrap";
import PetlyContext from "./PetlyContext";
import Favorite from "./Favorite";
import "./OrgCard.css"

// OrgCard component takes in org data for a specific org and data from any org that is favorited

//it renders a card with some info about the org

function OrgCard({ org, fav }) {
    const { user, getOrgAnimals } = useContext(PetlyContext)
    let orgData
    if (org) {
        orgData = {
            orgId: org.id,
            orgName: org.attributes.name,
            orgUrl: org.attributes.url,
            orgContact: org.attributes.email ? org.attributes.email : org.attributes.phone
        }
    }

    let favOrgs = user ? user.favOrgs.map(orgs => orgs.orgId) : []


    const handleClick = async () => {
        if (org) {
            return await getOrgAnimals(org.id, org.attributes.name)
        } else if (fav) {
            return await getOrgAnimals(fav.orgId, fav.orgName)
        }
    }

    return (
        <>

            {fav ? <Card
                className="nearby-link"

            >

                <Favorite
                    org={fav}
                    currFav={true} />


                <CardBody>
                    <CardTitle>
                        <Nav>
                            <NavLink href={fav.orgUrl}>
                                {fav.orgName}
                            </NavLink>

                        </Nav>
                    </CardTitle>
                    <List>
                        <ListGroupItem>
                            {fav.orgName}
                        </ListGroupItem>
                        <ListGroupItem>
                            {fav.orgUrl}
                        </ListGroupItem>
                        <ListGroupItem>
                            {fav.orgContact}
                        </ListGroupItem>
                    </List>
                    <Button onClick={handleClick} color="primary">See Our Pets!</Button>
                </CardBody>
            </Card>
                : org ?
                    <Card
                        className="nearby-link"

                    >
                        {favOrgs.includes(+org.id) ?
                            <Favorite
                                org={orgData}
                                currFav={true} />
                            :
                            <Favorite
                                org={orgData}
                            />}

                        <CardBody>
                            <CardTitle>
                                <Nav>
                                    <NavLink href={org.attributes.url}>
                                        {org.attributes.name}
                                    </NavLink>

                                </Nav>
                            </CardTitle>
                            <List>
                                <ListGroupItem>
                                    located In: {org.attributes.citystate}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Email: {org.attributes.email}
                                </ListGroupItem>
                                <ListGroupItem>
                                    {org.attributes.distance} Miles Away
                                </ListGroupItem>
                            </List>
                            <Button onClick={handleClick} color="primary">See Our Pets!</Button>
                        </CardBody>
                    </Card>
                    : <div> <p>Loading...</p><Spinner color="info" /></div>}
        </>

    )

}

export default OrgCard