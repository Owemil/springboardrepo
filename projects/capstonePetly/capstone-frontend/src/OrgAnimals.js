import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import { Form, Input, Pagination, PaginationItem, PaginationLink, Spinner } from "reactstrap";

// OrgAnimals component takes in animals to display and a function to get animals

//it renders a search form and cards with pet info that link to their respective page

function OrgAnimals({ animals, getAnimals }) {
    const [filteredSearch, setFilteredSearch] = useState()
    const [filterSpecies, setFilterSpecies] = useState(["All Animals", "Dogs", "Cats", "Birds", "Rabbits", "Barnyard", "Reptile", "Small & Furry", "Scales, Shells & Other"])
    const { orgName, id } = useParams()
    const navigate = useNavigate()



    const firstPage = async () => {
        const res = await getAnimals(id)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({ meta: res.meta, animals: ["Sorry, we couldn't find what you're looking for.."] }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))
    }
    const prevPage = async (page) => {
        const prev = page - 1
        const res = await getAnimals(id, orgName, prev)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({ meta: res.meta, animals: ["Sorry, we couldn't find what you're looking for.."] }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))
    }
    const handlePage = async (page) => {
        const res = await getAnimals(id, orgName, page)

        res.meta.count === 0 ?
            setFilteredSearch(() => ({ meta: res.meta, animals: ["Sorry, we couldn't find what you're looking for.."] }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))


    }
    const nextPage = async (page) => {
        const prev = page + 1
        const res = await getAnimals(id, orgName, prev)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({ meta: res.meta, animals: ["Sorry, we couldn't find what you're looking for.."] }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))
    }

    const paginate = (page, total, arr = []) => {
        if (arr.length >= 5 || page > total) {
            return arr
        }
        arr.push(page)
        page += 1
        return paginate(page, total, arr)
    }

    const handleChange = (evt) => {
        const { value } = evt.target
        navigate(`/search/${value}`)
    }
    return (
        <>
            <div>
                <Form>
                    <Input
                        id="search-species"
                        name="species"
                        onChange={handleChange}
                        type="select">
                        {filterSpecies.map((item, idx) => {
                            return (
                                <option key={idx}>{item}</option>
                            )
                        })}
                    </Input>
                </Form>
                { }
                <h3>
                    <b>{animals ? animals.meta.count : filteredSearch.meta.count} Animals from {orgName}</b>
                </h3>
            </div>

            {filteredSearch ?
                filteredSearch.animals.map(animal => {
                    return (
                        <div className="animal-card" >
                            <AnimalCard search={animal.attributes} id={animal.id} key={animal.id} />
                        </div>
                    )
                })
                :
                animals.animals ?
                    animals.animals.map(animal => {
                        return (
                            <div className="animal-card" >
                                <AnimalCard search={animal.attributes} id={animal.id} key={animal.id} />
                            </div>
                        )
                    })
                    :
                    <div>
                        <p>loading...</p><Spinner>Loading...</Spinner>
                    </div>}

            {filteredSearch ?
                <div className="search-pages">
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                first
                                onClick={firstPage}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => prevPage(filteredSearch.meta.pageReturned)}
                                previous
                            />
                        </PaginationItem>
                        {paginate(
                            filteredSearch.meta.pageReturned,
                            filteredSearch.meta.pages).map((page, idx) => {
                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationLink onClick={() => handlePage(page)}>
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })}


                        <PaginationItem>
                            <PaginationLink
                                onClick={() => nextPage(filteredSearch.meta.pageReturned)}
                                next
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePage(filteredSearch.meta.pages)}
                                last
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
                :
                animals ?
                    <div className="search-pages">
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink
                                    first
                                    onClick={firstPage}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => prevPage(animals.meta.pageReturned)}
                                    previous
                                />
                            </PaginationItem>
                            {paginate(
                                animals.meta.pageReturned,
                                animals.meta.pages).map((page, idx) => {
                                    return (
                                        <PaginationItem key={idx}>
                                            <PaginationLink onClick={() => handlePage(page)}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}


                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => nextPage(animals.meta.pageReturned)}
                                    next
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handlePage(animals.meta.pages)}
                                    last
                                />
                            </PaginationItem>
                        </Pagination>
                    </div> : <></>}

        </>

    )

}

export default OrgAnimals