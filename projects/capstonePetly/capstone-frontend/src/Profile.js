import React, { useContext, useEffect, useState } from "react";
import PetlyContext from "./PetlyContext";
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, Spinner, TabContent, TabPane } from "reactstrap";
import OrgCard from "./OrgCard";
import AnimalCard from "./AnimalCard";

/**Profile component takes in updateUser function which contains the api call for updating a users data
 * 
 * it renders a form that displays the users current information and allows them to edit that same information excluding username
*/

function Profile({ update }) {
    const [activeTab, setActiveTab] = useState(1)
    const { user } = useContext(PetlyContext)
    const [editForm, setEditForm] = useState()

    useEffect(() => {
        if (user) {

            setEditForm(() => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                zipCode: user.zipCode
            }))

        }
    }, [user])


    const handleChange = evt => {
        evt.preventDefault()
        const { name, value } = evt.target
        setEditForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    const handleClick = async evt => {
        evt.preventDefault()
        await update(editForm)

    }

    const handleTab = evt => {
        const tab = evt.target.attributes.data.value
        const profileTab = document.querySelector(`[data="${activeTab}"]`)
        const newActiveTab = document.querySelector(`[data="${tab}"]`)
        profileTab.classList.remove("active")
        newActiveTab.classList.add("active")
        setActiveTab(() => tab)

    }

    return (
        <>
            {user ? <div className="profile-div">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className="profile-user active"
                            data="1"
                            onClick={handleTab}
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="profile-favPets"
                            data="2"
                            onClick={handleTab}
                        >
                            Fav Pets
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="profile-favOrgs"
                            data="3"
                            onClick={handleTab}
                        >
                            Fav Orgs
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {!editForm ? <div> <p>Loading...</p><Spinner color="info" /></div> : <Card className="profile-card">
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor="profile-username">
                                            Username
                                        </Label>
                                        <Input id="profile-username" name="username" value={user.username} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="profile-firstName">
                                            First Name
                                        </Label>
                                        <Input id="profile-firstName" name="firstName" value={editForm.firstName} onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="profile-lastName">
                                            Last Name
                                        </Label>
                                        <Input id="profile-lastName" name="lastName" value={editForm.lastName} onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="profile-email">
                                            Email
                                        </Label>
                                        <Input id="profile-email" name="email" value={editForm.email} onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="profile-zipCode">
                                            Zip Code
                                        </Label>
                                        <Input id="profile-zipCode" name="zipCode" value={editForm.zipCode} onChange={handleChange} />
                                    </FormGroup>
                                    <Button onClick={handleClick} color="primary">
                                        edit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>}

                    </TabPane>
                    <TabPane tabId="2">
                        {user.favPets ? user.favPets.map((animal, idx) => {
                            return (
                                <div className="animal-card" key={idx} >
                                    <AnimalCard fav={animal} />
                                </div>
                            )
                        }) : <p>No favorites yet!</p>}
                    </TabPane>
                    <TabPane tabId="3">
                        {!user.favOrgs ? <p>No favorites yet!</p> : user.favOrgs.map((org, idx) => {
                            return (
                                <div className="animal-card" key={idx}>
                                    <OrgCard fav={org} />
                                </div>
                            )
                        })}
                    </TabPane>
                </TabContent>
            </div> : <div> <p>Loading...</p><Spinner color="info" /></div>}
        </>

    )
}

export default Profile


