import React, { useContext, useState } from "react";
import JoblyContext from "./JoblyContext";

/**Profile component takes in updateUser function which contains the api call for updating a users data
 * 
 * it renders a form that displays the users current information and allows them to edit that same information excluding username
 */

function Profile({ update }) {
    const { user } = useContext(JoblyContext)
    console.log(user.user.applications)
    const [editForm, setEditForm] = useState({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email
    })
    const handleChange = evt => {
        evt.preventDefault()
        const { name, value } = evt.target
        setEditForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    return (
        <>
            <form>
                <label htmlFor='username'>
                    Username
                </label>
                <input id="username" name="username" value={user.user.username} disabled />
                <label htmlFor='firstName'>
                    First Name
                </label>
                <input id="firstName" name="firstName" value={editForm.firstName} onChange={handleChange} />
                <label htmlFor='lastName'>
                    Last Name
                </label>
                <input id="lastName" name="lastName" value={editForm.lastName} onChange={handleChange} />
                <label htmlFor='email'>
                    Email
                </label>
                <input id="email" name="email" value={editForm.email} onChange={handleChange} />
                <button onClick={evt => update(evt, editForm)}>Update</button>
            </form>
        </>
    )
}

export default Profile