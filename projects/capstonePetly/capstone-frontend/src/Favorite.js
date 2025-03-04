import React, { useContext, useState } from "react";
import PetlyContext from "./PetlyContext";
import { useNavigate } from "react-router-dom";

// Favorite component takes in org and pet data and if currFav is true or false
// it renders a small heart on all animal and org cards

function Favorite({ pet, org, currFav = false }) {
    const [fav, setFav] = useState(currFav)
    const navigate = useNavigate()
    const { user, addFavPet, removeFavPet, addFavOrg, removeFavOrg, setReRender } = useContext(PetlyContext)
    const emptyHeart = "\u2661"
    const filledHeart = "\u{1F497}"

    const handleClick = async (evt) => {
        evt.stopPropagation()
        if (user) {
            if (pet) {

                !fav ? await addFavPet(user.username, pet) : await removeFavPet(user.username, pet.petId)
                setFav(!fav)
            } else if (org) {

                !fav ? await addFavOrg(user.username, org) : await removeFavOrg(user.username, org.orgId)
                setFav(!fav)
                setReRender('rerender')
            }

        } else {
            navigate(`/signup`)
        }
    }

    return (
        <>
            {!fav ?
                <div className="fav-btn" onClick={handleClick}>
                    <h1 className="fav-icon">{emptyHeart}</h1>
                </div>

                :
                <div className="fav-btn" onClick={handleClick}>
                    <h1 className="fav-icon">{filledHeart}</h1>
                </div>
            }

        </>
    )
}


export default Favorite