import React, { useContext, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useNavigate } from "react-router-dom";
import JoblyContext from "./JoblyContext";

/**CompanyList component
 * 
 * it takes in user info from state and the inital companies data and a function for doing filtered searchs for companies
 * 
 * it renders a search form for filtered searchs of companies and a list of all relevent companies
 */


function CompanyList({ companies, getCompanies }) {
    const { user } = useContext(JoblyContext)

    const navigate = useNavigate()
    if (!user) {
        navigate('/login')
    }


    const [searchForm, setSearchForm] = useState({
        name: "",
        minEmployees: "",
        maxEmployees: ""
    })
    const [filterComps, setFilterComps] = useState(null)

    const handleChange = evt => {
        const { name, value } = evt.target
        setSearchForm(oldForm => ({ ...oldForm, [name]: value }))
    }

    const handleClick = async evt => {
        evt.preventDefault()
        const filteredRes = await getCompanies(searchForm)
        console.log(filteredRes)
        setFilterComps(filteredRes)
    }

    return (
        <>
            <form>
                <label htmlFor='name'>
                    Company Name:
                </label>
                <input id="name" name="name" value={searchForm.name} onChange={handleChange} required />
                <label htmlFor='minEmployees'>
                    minEmployees:
                </label>
                <input id="minEmployees" name="minEmployees" value={searchForm.minEmployees} onChange={handleChange} />
                <label htmlFor='maxEmployees'>
                    maxEmployees:
                </label>
                <input id="maxEmployees" name="maxEmployees" value={searchForm.maxEmployees} onChange={handleChange} />
                <button onClick={handleClick}>
                    Submit
                </button>
            </form>
            {filterComps ?
                filterComps.map((company, idx) => {
                    return (
                        <div className="comp-card" key={idx}>
                            <CompanyCard company={company} />
                        </div>
                    )

                })
                :
                companies.map((company, idx) => {
                    return (
                        <div className="comp-card" key={idx}>
                            <CompanyCard company={company} />
                        </div>
                    )

                })}

        </>
    )
}

export default CompanyList