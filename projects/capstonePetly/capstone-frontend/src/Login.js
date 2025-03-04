import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";

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
    const [errors, setErrors] = useState({})
    const handleChange = evt => {
        const { name, value } = evt.target

        setLoginForm(oldForm => ({ ...oldForm, [name]: value }))

    }

    const validateForm = () => {
        let newErrors = {};

        if (!loginForm.username) {
            newErrors.username = 'Username is required';
        }

        if (!loginForm.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(() => newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };


    const handleClick = async evt => {
        if (validateForm()) {
            try {
                await login(evt, 'auth/token', loginForm)
            } catch (err) {
                setErrors(oldErr => ({ ...oldErr, invalid: "username and password do not match" }))
            }
            setLoginForm({
                username: "",
                password: ""
            })
        }

    }
    return (
        <div class="login-div">
            <Card className="login-card">
                <CardBody>
                    <CardTitle>
                        Petly Login
                    </CardTitle>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="login-username">
                                Username
                            </Label>
                            <Input id="login-username" name="username" value={loginForm.username} onChange={handleChange} />
                            {errors.username && <p style={{
                                color: "red"
                            }}>{errors.username}</p>}
                        </FormGroup>
                        {errors.invalid && <p style={{
                            color: "red"
                        }}>{errors.invalid}</p>}
                        <FormGroup>
                            <Label htmlFor="login-password">
                                Password
                            </Label>
                            <Input id="login-password" name="password" value={loginForm.password} onChange={handleChange} type="password" />
                            {errors.password && <p style={{
                                color: "red"
                            }}>{errors.password}</p>}
                        </FormGroup>
                        <Button onClick={handleClick} color="primary">
                            Login
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login

