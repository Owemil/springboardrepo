import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyContext from "./JoblyContext"

/**
 * CompanyDetails component takes in the initial useEffect data of companies and jobs
 * 
 * ite renders a card with the correct companies information and all jobs pertaining to that company
 */

function CompanyDetails({ companies, jobs }) {
    // User context for app
    const { user } = useContext(JoblyContext)
    //  params to get info for single job
    const { handle } = useParams()
    // find the company matching the handle param
    const company = companies.find(company => company.handle === handle)
    // find all jobs matching handle param
    const companyJobs = jobs.filter(job => job.companyHandle === handle)
    // if there is no user redirect to login
    const navigate = useNavigate()
    if (!user) {
        navigate('/login')
    }

    return (
        <>
            <h1>
                {company.name}
            </h1>
            <p>Total Employees:{company.numEmployees}</p>
            <p>{company.description}</p>
            {companyJobs.map((job, idx) => {
                return (
                    <div className="comp-job" key={idx}>
                        <JobCard job={job} />
                    </div>
                )
            })}
        </>
    )
}

export default CompanyDetails