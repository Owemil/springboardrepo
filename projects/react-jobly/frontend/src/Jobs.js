import React, { useContext, useState } from "react";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import JoblyContext from "./JoblyContext";

/**Jobs component
 * 
 * takes in user context the initial jobs data and a search function which contains the api call for filtered job searchs
 * 
 * it renders a list of all jobs from all companies and a form that allows you to search based on title, minSalary and if the job has equity or not
 */


function Jobs({ jobs, search }) {
    const { user } = useContext(JoblyContext)

    const navigate = useNavigate()
    if (!user) {
        navigate('/login')
    }

    const [searchForm, setSearchForm] = useState({
        title: "",
        minSalary: "",
        hasEquity: false
    })
    const [filterJobs, setFilterJobs] = useState(null)

    const handleChange = evt => {
        const { name, value } = evt.target
        setSearchForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    const handleCheck = evt => {
        const { name, checked } = evt.target
        setSearchForm(oldForm => ({ ...oldForm, [name]: checked }))
    }

    const handleClick = async evt => {
        evt.preventDefault()
        const filteredRes = await search(evt, searchForm)
        setFilterJobs(filteredRes)
    }


    return (
        <>
            <form>
                <label htmlFor='title'>
                    Title:
                </label>
                <input id="title" name="title" value={searchForm.title} onChange={handleChange} required />
                <label htmlFor='minSalary'>
                    minSalary:
                </label>
                <input id="minSalary" name="minSalary" value={searchForm.minSalary} onChange={handleChange} />
                <label htmlFor='hasEquity'>
                    hasEquity:
                </label>
                <input type="checkbox" id="hasEquity" name="hasEquity" value={searchForm.hasEquity} onChange={handleCheck} />
                <button onClick={handleClick}>
                    Submit
                </button>
            </form>

            {filterJobs ?
                filterJobs.map((job, idx) => {
                    return (
                        <div className="job-card" key={idx}>
                            <JobCard job={job} />
                        </div>
                    )

                })
                :
                jobs.map((job, idx) => {
                    return (
                        <div className="job-card" key={idx}>
                            <JobCard job={job} />
                        </div>
                    )
                })}
        </>
    )
}

export default Jobs