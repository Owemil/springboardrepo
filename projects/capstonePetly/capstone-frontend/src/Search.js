import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, Pagination, PaginationItem, PaginationLink, Row, Spinner } from "reactstrap";
import PetlyContext from "./PetlyContext";
import AnimalCard from "./AnimalCard";

/**Search component takes in the functions filter and slugify, and the obj otherFilters from context
 * 
 *  it renders a search page for animals of many species within 100 miles or more
 * 
 */

function Search() {
    const { species } = useParams()
    const navigate = useNavigate()
    const { filter, otherFilters, slugify, getNearby } = useContext(PetlyContext)
    const [filterSpecies, setFilterSpecies] = useState(["Dogs", "Cats", "Birds", "Rabbits", "Barnyard", "Reptile", "Small & Furry", "Scales, Shells & Other"])
    const [filteredSearch, setFilteredSearch] = useState()
    const slugSpecies = species ? slugify(species) : ""
    const [searchForm, setSearchForm] = useState({
        species: !otherFilters.filterSet.has(species) ? species : otherFilters[slugSpecies][0],
        radius: "25 miles",
        sort: "Nearest",
        location: ""
    })
    const [locForm, setLocForm] = useState({
        location: ""
    })

    useEffect(() => {
        if (otherFilters.filterSet.has(species)) {
            setFilterSpecies(() => (otherFilters[slugify(species)]))
        }
        async function populateSearch() {
            console.log("search")

            const res = await filter(searchForm)
            res.meta.count === 0 ?
                setFilteredSearch(() => ({ meta: res.meta }))
                :
                setFilteredSearch(() => ({
                    meta: res.meta,
                    animals: [...res.data]
                }))


        }
        if (species) {

            populateSearch()
        } else {
            console.log(species, "nearby")
            async function populateNearby() {
                const res = await getNearby()
                setFilteredSearch(() => ({
                    meta: res.meta,
                    animals: [...res.data]
                }))

            }
            populateNearby()
        }
    }, [species, searchForm])


    const firstPage = async () => {
        const res = await filter(searchForm)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.data.meta,
                animals: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.data.meta,
                animals: [...res.data]
            }))
    }

    const prevPage = async (page) => {
        const prev = page - 1
        const res = await filter(searchForm, prev)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))
    }
    const handlePage = async (page) => {
        const res = await filter(searchForm, page)

        res.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))


    }
    const nextPage = async (page) => {
        const prev = page + 1
        const res = await filter(searchForm, prev)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: ["We couldn't find anything.."]
            }))
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

    const handleChange = evt => {
        const { name, value } = evt.target

        if (name === "species") {
            const changeSlug = slugify(value)
            setFilteredSearch(null)
            setSearchForm(oldForm => ({
                ...oldForm, [name]: otherFilters.filterSet.has(value) ?
                    otherFilters[changeSlug][0] : value
            }))

            navigate(`/search/${value}`)
        } else if (name === "location") {
            setLocForm(() => ({ [name]: value }))
        } else {
            setSearchForm(oldForm => ({ ...oldForm, [name]: value }))
        }
    }

    const handleClick = async (evt) => {
        evt.preventDefault()
        setSearchForm(oldForm => ({ ...oldForm, location: locForm.location }))

        const res = await filter(searchForm)
        res.meta.count === 0 ?
            setFilteredSearch(() => ({ meta: res.meta }))
            :
            setFilteredSearch(() => ({
                meta: res.meta,
                animals: [...res.data]
            }))
    }

    return (
        <>
            <div>
                <Form>
                    <Row className="inline-block">
                        <Col>
                            <Input
                                style={{
                                    width: "11rem"
                                }}
                                id="search-species"
                                className='search-input'
                                name="species"
                                defaultValue={searchForm.species}
                                onChange={handleChange}
                                type="select">
                                {filterSpecies.map((item, idx) => {
                                    return (
                                        <option key={idx} >{item}</option>
                                    )
                                })}
                            </Input>
                        </Col>
                        <Col>
                            <Input
                                style={{
                                    width: "11rem"
                                }}
                                id="search-radius"
                                className='search-input'
                                name="radius"
                                defaultValue={searchForm.radius}
                                onChange={handleChange}
                                type="select">
                                <option>10 miles</option>
                                <option>25 miles</option>
                                <option>50 miles</option>
                                <option>100 miles</option>
                                <option>Anywhere</option>
                            </Input>
                        </Col>
                        <Col>
                            <Input
                                style={{
                                    width: "11rem"
                                }}
                                id="search-sort"
                                className='search-input'
                                name="sort"
                                defaultValue={searchForm.sort}
                                onChange={handleChange}
                                type="select">
                                <option>Nearest</option>
                                <option>Furthest</option>
                                <option>Random</option>
                            </Input>
                        </Col>
                        <Col>
                            <Input
                                style={{
                                    width: "12rem"
                                }}
                                id="search-location"
                                className='search-input'
                                name="location"
                                placeholder="search by zip code"
                                value={locForm.location}
                                onChange={handleChange}
                            />
                        </Col>
                        <Button onClick={handleClick} color="primary">Filter</Button>
                    </Row>
                </Form>
                <Form>

                </Form>
            </div>
            <div>

                {!filteredSearch ? <div>
                    <p>loading...</p><Spinner>Loading...</Spinner>
                </div>
                    :
                    (filteredSearch.meta.count) === 0 ?
                        <div>
                            <h3>Sorry, we cant find any of the requested animal..</h3>
                        </div>
                        :
                        (filteredSearch.animals) ? filteredSearch.animals.map(animal => {
                            if (animal.attributes) {
                                return (
                                    <div className="animal-card" >
                                        <AnimalCard search={animal.attributes} id={animal.id} key={animal.id} />
                                    </div>
                                )
                            }
                        }) : <p>you shouldnt be seeing this right now....look away..</p>}
            </div>
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
                            filteredSearch.meta.pages).map(page => {
                                return (
                                    <PaginationItem>
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
                </div> : <></>}
        </>
    )
}

export default Search