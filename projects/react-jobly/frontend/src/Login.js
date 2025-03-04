import React, { useState } from "react";

/**Login component
 * takes in the function login which contains the api call to log a user in and set their token
 * 
 * it renders a form for logging a user in
 */

function Login({ login }) {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const handleChange = evt => {
        evt.preventDefault()
        const { name, value } = evt.target
        setLoginForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    const handleClick = async evt => {
        await login(evt, 'auth/token', loginForm)
        setLoginForm({
            username: "",
            password: ""
        })
    }
    return (
        <div>
            <form>
                <label htmlFor='username'>
                    Username
                </label>
                <input id="username" name="username" value={loginForm.username} onChange={handleChange} />
                <label htmlFor='password'>
                    Password
                </label>
                <input type="password" id="password" name="password" value={loginForm.password} onChange={handleChange} />
                <button onClick={handleClick}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login