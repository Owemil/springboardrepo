import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Pagination, PaginationItem, PaginationLink, Row, Spinner } from "reactstrap";
import OrgCard from "./OrgCard";
import "./OrgSearch.css"

// OrgSearch component takes in the function search which is an api call that requests orgs and locData which is the current location data for the user

function OrgSearch({ search, locData }) {
    const [filteredSearch, setFilteredSearch] = useState()

    const [orgSearch, setOrgSearch] = useState({
        location: locData ? locData.zip : '',
        name: ''
    })

    useEffect(() => {
        async function populate() {
            const res = await search(orgSearch)

            setFilteredSearch(() => ({ meta: res.data.meta, orgs: res.data.data }))

        }
        populate()
    }, [])

    const firstPage = async () => {
        const res = await search(orgSearch)
        res.data.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: res.data.data
            }))
    }
    const prevPage = async (page) => {
        const prev = page - 1
        const res = await search(orgSearch, prev)
        res.data.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: res.data.data
            }))
    }
    const handlePage = async (page) => {
        const res = await search(orgSearch, page)

        res.data.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: res.data.data
            }))
    }
    const nextPage = async (page) => {
        const prev = page + 1
        const res = await search(orgSearch, prev)
        res.data.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: res.data.data
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

    const handleClick = async (evt) => {
        evt.preventDefault()
        const res = await search(orgSearch)

        res.data.meta.count === 0 ?
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: ["We couldn't find anything.."]
            }))
            :
            setFilteredSearch(() => ({
                meta: res.data.meta,
                orgs: res.data.data
            }))

    }

    const handleChange = evt => {
        const { name, value } = evt.target
        setOrgSearch(oldForm => ({ ...oldForm, [name]: value }))
    }
    return (
        <>
            <div>
                <h3 className="orgSearch-header ">Search for Animal Shelters and Rescues</h3>
                <Form>
                    <Row className="inline-block">
                        <Col>
                            <Input
                                id="orgSearch-location"
                                name="location"
                                placeholder="Zip Code 98404, 95129 etc.." value={orgSearch.location}
                                onChange={handleChange} />
                        </Col>
                        <Col>
                            <Input
                                id="orgSearch-name"
                                name="name"
                                placeholder="Name, full or partial"
                                value={orgSearch.name}
                                onChange={handleChange} />
                        </Col>
                        <Button onClick={handleClick} color="primary">Search</Button>
                    </Row>
                </Form>
            </div>
            {filteredSearch ? filteredSearch.orgs.map((org, idx) => {
                return (
                    <div className="org-cards">
                        <OrgCard org={org} key={idx} />
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

export default OrgSearch