import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyContext from "./JoblyContext";

/**Jobly component
 * 
 * it is the home component and only takes in user context
 * 
 * it renders  two different cards depending on if the user is logged in or not one directs the user to login/sign up and the other welcomes back the user while displaying a different navbar
 */


function Jobly() {
    const { user } = useContext(JoblyContext)

    const navigate = useNavigate()
    return (
        <div>
            {user ?
                <>
                    <h1>Jobly</h1>
                    <p>All the jobs in one, convenient place.</p>
                    <h2>Welcome back, {user.user.firstName}</h2>
                </> :
                <>
                    <h1>Jobly</h1>
                    <p>All the jobs in one, convenient place.</p>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/signup')}>Sign up</button>
                </>}

        </div>
    )
}

export default Jobly