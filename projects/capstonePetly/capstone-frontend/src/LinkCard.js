import React from "react";
import "./LinkCard.css"
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardText, CardFooter, CloseButton, Toast, ToastHeader, ToastBody } from "reactstrap";
import useToggle from "./helpers/useToggle"

// LinkCard component takes in meta data from api requests to inform on animal amount and to link to search pages

function LinkCard({ meta, search }) {
    const [isOpen, toggle] = useToggle()
    const other = ["Birds", "Rabbits", "Horses", "Barnyard", "Reptile", "Small & Furry", "Scales, Shells & Other"]
    const navigate = useNavigate()

    if (meta) {
        return (
            <>
                <Card
                    style={{
                        width: '18rem'
                    }}
                    className="card-link-meta"
                    onClick={() => { return navigate(`/search`) }}
                >

                    <CardBody className='link-body'>
                        <CardText>
                            View {meta.count} more pets nearby!
                        </CardText>
                        <CardFooter className="lc-footer">Meet Them!</CardFooter>
                    </CardBody>
                </Card>

            </>
        )
    } else if (search === "Other Animals") {
        return (
            <div>
                <Card
                    style={{
                        width: '8.5rem',
                        height: '5rem'
                    }}
                    className="card-link"
                    onClick={toggle}
                >

                    <CardBody className='link-body'>
                        <CardText>
                            {search}
                        </CardText>
                    </CardBody>
                </Card>

                <Toast isOpen={isOpen} className="others-toast">
                    <ToastHeader >
                        <CloseButton onClick={toggle} />
                    </ToastHeader>
                    <ToastBody>
                        <p>What type of pet are you searching for?</p>
                        <div>
                            {other.map((o, idx) => {
                                return (
                                    <Card
                                        onClick={() => {
                                            return navigate(`/search/${o}`)
                                        }}
                                        key={idx}
                                    >

                                        <CardBody>
                                            <CardText>
                                                {o}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                )
                            })}

                        </div>
                    </ToastBody>
                </Toast>
            </div>
        )
    } else if (search === "Organizations") {
        return (
            <Card
                style={{
                    width: '8.5rem',
                    height: '5rem'
                }}
                className="card-link"
                onClick={() => { return navigate(`/orgs`) }}
            >

                <CardBody className='link-body'>
                    <CardText>
                        {search}
                    </CardText>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card
                style={{
                    width: '8.5rem',
                    height: '5rem'
                }}
                className="card-link"
                onClick={() => { return navigate(`/search/${search}`) }}
            >

                <CardBody className='link-body'>
                    <CardText>
                        {search}
                    </CardText>
                </CardBody>
            </Card>
        )
    }

}



export default LinkCard




