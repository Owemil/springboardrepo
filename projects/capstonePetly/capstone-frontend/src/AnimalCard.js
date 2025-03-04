import React, { useContext } from "react";
import PetlyContext from "./PetlyContext";
import "./AnimalCard.css"
import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap";
import Favorite from "./Favorite";

// AnimalCard component takes in animal data from different sources and builds a card based on the data sent through

function AnimalCard({ nearby, search, id, fav }) {
    const { user, getAnimal } = useContext(PetlyContext)

    const name = nearby ? nearby.name.toLowerCase() : search ? search.name.toLowerCase() : fav ? fav.petName : ""

    let favPets = user ? user.favPets.map(animal => animal.petId) : []

    const handleClick = async () => {
        await getAnimal(id)
    }

    if (nearby) {
        return (
            <div className="card-animal">
                <Card
                    style={{
                        width: '18rem'
                    }}
                    onClick={handleClick}
                >
                    {!user ?
                        <Favorite
                            pet={{
                                petId: id,
                                petName: name,
                                petPic: nearby.pictureThumbnailUrl
                            }}
                        />
                        : favPets.includes(+id) ?
                            <Favorite
                                pet={{
                                    petId: id,
                                    petName: name,
                                    petPic: nearby.pictureThumbnailUrl
                                }}
                                currFav={true} />
                            :
                            <Favorite
                                pet={{
                                    petId: id,
                                    petName: name,
                                    petPic: nearby.pictureThumbnailUrl
                                }}
                            />}
                    <CardImg
                        alt={name}
                        src={nearby.pictureThumbnailUrl}
                        className="card-img"
                        top
                        width="100%" />
                    <CardBody className="card-body">
                        <CardTitle tag="h5">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </CardTitle>
                    </CardBody>
                </Card>

            </div>
        )
    } else if (search) {
        return (
            <div className="card-animal">
                <Card
                    style={{
                        width: '18rem'
                    }}
                    onClick={handleClick}
                >
                    {favPets.includes(+id) ?
                        <Favorite
                            pet={{
                                petId: id,
                                petName: name,
                                petPic: search.pictureThumbnailUrl
                            }}
                            currFav={true} />
                        :
                        <Favorite
                            pet={{
                                petId: id,
                                petName: name,
                                petPic: search.pictureThumbnailUrl
                            }}
                        />}

                    <CardImg
                        alt={name}
                        src={search.pictureThumbnailUrl}
                        className="card-img"
                        top
                        width="100%" />
                    <CardBody className="card-body">
                        <CardTitle tag="h5">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </CardTitle>
                        <CardText className="card-text">
                            {search.ageGroup} - {search.breedPrimary}
                        </CardText>
                        {search.distance ?
                            <CardText className="card-text2">
                                {search.distance}  miles away
                            </CardText>
                            : <></>}

                    </CardBody>
                </Card>

            </div>
        )
    } else if (fav) {

        return (
            <div className="card-animal">
                <Card
                    style={{
                        width: '18rem'
                    }}
                    onClick={handleClick}
                >
                    <Favorite
                        id={fav.petId}
                        name={fav.petName}
                        pic={fav.petPic}
                        currFav={true} />

                    <CardImg
                        alt={fav.petName}
                        src={fav.petPic}
                        className="card-img"
                        top
                        width="100%" />
                    <CardBody className="card-body">
                        <CardTitle tag="h5">
                            {fav.petName}
                        </CardTitle>

                    </CardBody>
                </Card>

            </div>
        )
    }


}

export default AnimalCard 