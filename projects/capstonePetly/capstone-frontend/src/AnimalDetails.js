import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import LinkCard from './LinkCard';
import "./AnimalDetails.css"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    ListGroup,
    ListGroupItem,
    Spinner,
} from 'reactstrap';

// AnimalDetails component takes in a specfic animals data and a function to help build a detailed page for the animal. with about info, more animals, and org data


function AnimalDetails({ animal, getOtherPets }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [otherPets, setOtherPets] = useState()
    const [otherNearbyPets, setOtherNearbyPets] = useState()
    const [activeTab, setActiveTab] = useState(2)
    console.log(animal)
    const storyHTML = new DOMParser().parseFromString(animal.data[0].attributes.descriptionHtml, "text/html")
    const animalData = animal.data[0].attributes
    const items = animal.included.filter(i => (i.type === "pictures" || i.type === "videourls"))

    const [species, org] = animal.included.filter(i => (i.type === "species" || i.type === "orgs"))
    console.log(species, org)

    const [colors] = animal.included.filter(i => i.type === "colors")

    useEffect(() => {
        const populateOthers = async () => {
            const animalSpecies = species.attributes.plural
            const id = org.id
            const { otherOrgPets, otherNearby } = await getOtherPets(id, animalSpecies)
            console.log(otherNearby.meta.count)

            setOtherPets(() => [...otherOrgPets.data, otherOrgPets.meta])
            if (otherNearby.meta.count !== 0) {
                setOtherNearbyPets(() => [...otherNearby.data, otherNearby.meta])

            }
        }
        populateOthers()
    }, [animal])


    const next = () => {

        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {

        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {

        setActiveIndex(newIndex);
    };

    const slides = items.map((item, idx) => {
        return (
            <CarouselItem
                key={idx}
            >
                <img src={(item.type === "pictures") ? item.attributes.large.url : item.attributes.url}
                    style={{
                        height: "500px",
                        width: "540px",
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '60%'
                    }}
                    alt={animal.data[0].attributes.name} />

            </CarouselItem>
        );
    });

    const handleTab = evt => {
        const tab = evt.target.attributes.data.value
        const storyTab = document.querySelector(`[data="${activeTab}"]`)
        const newActiveTab = document.querySelector(`[data="${tab}"]`)
        storyTab.classList.remove("active")
        newActiveTab.classList.add("active")
        setActiveTab(() => tab)

    }

    return (
        <>
            {animal ? <><div className="animal-pics">
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    style={{
                        height: "500px",
                        width: "540px",
                        margin: "0 auto"
                    }}
                >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                        direction="prev"
                        directionText="Previous"
                        onClickHandler={previous}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Next"
                        onClickHandler={next}
                    />
                </Carousel>
            </div>
                <div className="animal-about">

                    {animalData ? <div className='animal-header'>
                        <h1 className="animal-name">{animalData.name}</h1>
                        <p className="animal-breed-loc"><b>{animalData.breedPrimary}</b>----<b>{org.attributes.citystate}</b></p>
                        <p>{animalData.ageGroup} - {animalData.sex} - {animalData.sizeGroup} - {colors ? colors.attributes.name : "Missing Color"}</p>
                    </div>
                        :
                        <p>Loading info..</p>}


                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className="animal-tab"
                                data="1"
                                onClick={handleTab}

                            >
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="animal-tab active"
                                data="2"
                                onClick={handleTab}

                            >
                                Story
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="animal-tab"
                                data="3"
                                onClick={handleTab}
                            >
                                Organization
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="animal-tab"
                                data="4"
                                onClick={handleTab}
                            >
                                Other Pets
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={`${activeTab}`}>
                        <TabPane tabId="1">

                            <ListGroup flush className='about-header'>
                                <ListGroupItem>
                                    <h4>
                                        About
                                    </h4>
                                </ListGroupItem>
                                <ListGroupItem></ListGroupItem>
                            </ListGroup>

                            <div>
                                {animal.data[0].attributes.qualities ?
                                    <div style={{
                                        width: "400px"
                                    }}>
                                        <ListGroup flush>
                                            <ListGroupItem tag="h5">
                                                Charactertistics
                                            </ListGroupItem>
                                            <ListGroupItem >
                                                {animal.data[0].attributes.qualities.map(q => `${q}, `)}
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>

                                    : <></>}

                                <div style={{
                                    width: "400px"
                                }}>
                                    <ListGroup flush>
                                        <ListGroupItem tag="h5">
                                            Breed & Coat Length
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            {animal.data[0].attributes.breedString}
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                                <div style={{
                                    width: "400px"
                                }}>
                                    <ListGroup flush>
                                        <ListGroupItem tag="h5">
                                            Adoption Status
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            {!animal.data[0].attributes.isAdoptionPending ? `Ready to be Adopted!` : `Adoption Currently Pending..`}
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                                {animal.data[0].attributes.adoptionFeeString ?
                                    <div style={{
                                        width: "400px"
                                    }}>
                                        <ListGroup>
                                            <ListGroupItem tag="h5">
                                                Adoption Fee
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                {`$${animal.data[0].attributes.adoptionFeeString}`}
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                    : <></>}

                            </div>

                        </TabPane>
                        <TabPane tabId="2">

                            <div className="animal-story">
                                <ListGroup flush className='about-header'>
                                    <ListGroupItem>
                                        <h4>Meet {animal.data[0].attributes.name}</h4>
                                    </ListGroupItem>
                                    <ListGroupItem></ListGroupItem>
                                </ListGroup>



                                {storyHTML.body.textContent}


                            </div>

                        </TabPane>
                        <TabPane tabId="3">

                            <div>
                                <ListGroup flush className='about-header'>
                                    <ListGroupItem>
                                        <h4>{org.attributes.name}</h4>
                                    </ListGroupItem>
                                    <ListGroupItem></ListGroupItem>
                                </ListGroup>
                                <div style={{
                                    width: "500px"
                                }}>
                                    <ListGroup flush>
                                        <ListGroupItem>
                                            {`Services: ${org.attributes.services}`}
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            {`Adoption Process: ${org.attributes.adoptionProcess}`}
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            {`Contact: ${org.attributes.phone ? org.attributes.phone : org.attributes.email}`}
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            {`Located in: ${org.attributes.citystate}, ${org.attributes.postalcode}`}
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <NavLink href={org.attributes.url}>Website: {org.attributes.url}</NavLink>
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </div>

                        </TabPane>
                        <TabPane tabId="4">
                            <div className='other-cards' >
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <h4>Other {species.attributes.plural} from {org.attributes.name} </h4>
                                    </ListGroupItem>
                                    <ListGroupItem></ListGroupItem>
                                </ListGroup>
                                {otherPets ? otherPets.map(animal => {
                                    if (animal.attributes) {
                                        return (
                                            <div className="animal-card" >
                                                <AnimalCard nearby={animal.attributes} id={animal.id} key={animal.id} />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="link-card" >
                                                <LinkCard meta={animal} key={animal.id} />
                                            </div>
                                        )


                                    }
                                })
                                    : <p>Finding pets...</p>}
                            </div>
                            <div className='other-cards'>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <h4>Other {species.attributes.plural} Nearby </h4>
                                    </ListGroupItem>
                                    <ListGroupItem></ListGroupItem>
                                </ListGroup>
                                {otherNearbyPets ? otherNearbyPets.map(animal => {
                                    if (animal.attributes) {
                                        return (
                                            <div className="animal-card" >
                                                <AnimalCard nearby={animal.attributes} id={animal.id} key={animal.id} />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="link-card" >
                                                <LinkCard meta={animal} key={animal.id} />
                                            </div>
                                        )


                                    }
                                })
                                    : <p>Sorry we cant find any animals nearby...</p>}
                            </div>

                        </TabPane>
                    </TabContent>

                </div></> : <div><p>Loading...</p><Spinner /></div>}

        </>
    );
}

export default AnimalDetails