import React, { useState } from "react";

/**
 * CompanyList component take in the function signup which contains the api call for making a new account and recieving a token
 * 
 * it renders a signup form for making a new account on Jobly
 */

function Signup({ signup }) {

    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })

    const handleChange = evt => {
        evt.preventDefault()
        const { name, value } = evt.target
        setSignupForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    const handleClick = async evt => {
        await signup(evt, 'auth/register', signupForm)
        setSignupForm({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: ""
        })
    }
    return (
        <div>
            <form>
                <label htmlFor='username'>
                    Username
                </label>
                <input id="username" name="username" value={signupForm.username} onChange={handleChange} />
                <label htmlFor='password'>
                    Password
                </label>
                <input type="password" id="password" name="password" value={signupForm.password} onChange={handleChange} />
                <label htmlFor='firstName'>
                    First Name
                </label>
                <input id="firstName" name="firstName" value={signupForm.firstName} onChange={handleChange} />
                <label htmlFor='lastName'>
                    Last Name
                </label>
                <input id="lastName" name="lastName" value={signupForm.lastName} onChange={handleChange} />
                <label htmlFor='email'>
                    Email
                </label>
                <input id="email" name="email" value={signupForm.email} onChange={handleChange} />
                <button
                    onClick={handleClick}>
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default Signup