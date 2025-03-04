import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import JoblyContext from "./JoblyContext";

/**NavBar component takes in user context and a logout funciton which empties both the state and localStorage for a user and their token
 * 
 * it renders a navbar to stay at the top of the screen thorughout the whole app
 */

function NavBar({ logout }) {
    const { user } = useContext(JoblyContext)

    return (
        <div>
            {user ?
                <nav>
                    <NavLink to='/'>
                        Jobly
                    </NavLink>
                    <NavLink to='/companies'>
                        companies
                    </NavLink>
                    <NavLink to='/jobs'>
                        Jobs
                    </NavLink>
                    <NavLink to='/profile'>
                        profile
                    </NavLink>
                    <NavLink onClick={logout}>
                        Log out {user.user.username}
                    </NavLink>
                </nav>
                :
                <nav>
                    <NavLink to='/'>
                        Jobly
                    </NavLink>
                    <NavLink to='/login'>
                        login
                    </NavLink>
                    <NavLink to='/signup'>
                        Sign up
                    </NavLink>
                </nav>}

        </div>
    )
}
export default NavBar