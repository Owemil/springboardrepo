import React, { useContext } from "react";
import JoblyContext from "./JoblyContext"

/**JobCard component
 * it takes in the user and a function called apply from state and data about a single job as a prop
 * 
 * apply contains the api call which allows a specific user to apply for a job
 * 
 * it renders a card the contains information about a job and a button to apply to that job
 */

function JobCard({ job }) {
    const { user, apply } = useContext(JoblyContext)
    const applied = user.user.applications.find(app => app === job.id)


    return (
        <>
            <h2>
                <b>
                    {job.title}
                </b>
            </h2>
            <h3>
                {job.companyName}
            </h3>
            <p>Salary:{job.salary} </p>
            <p>Equity:{(job.equity === null) ? 0 : job.equity} </p>
            {applied ?
                <button disabled>
                    Applied
                </button>
                :
                <button onClick={evt => apply(evt, job.id)}>
                    Apply
                </button>}

        </>
    )
}

export default JobCard