import React, { useContext, useState } from "react";
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";
import "./Signup.css"

/**
 * Signup component takes in the function signup which contains the api call for making a new account and recieving a token
 * 
 * it renders a signup form for making a new account on Petly
*/

function Signup({ signup }) {
    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        zipCode: ""
    })
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        if (!signupForm.username) {
            newErrors.username = 'Username is required';
        } else if (signupForm.username.length > 25) {
            newErrors.username = 'Username must be 25 characters or less';
        }

        if (!signupForm.password) {
            newErrors.password = 'Password is required';
        } else if (signupForm.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!signupForm.firstName) {
            newErrors.firstName = "First Name is required";
        }

        if (!signupForm.lastName) {
            newErrors.lastName = "Last Name is required";
        }

        if (!signupForm.email) {
            newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signupForm.email)) {
            newErrors.email = "Invalid email address";
        }



        setErrors(() => newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleChange = evt => {
        evt.preventDefault()
        const { name, value } = evt.target
        setSignupForm(oldForm => ({ ...oldForm, [name]: value }))
    }
    const handleClick = async evt => {
        if (validateForm()) {
            await signup(evt, 'auth/register', signupForm)
            setSignupForm({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                zipCode: ""
            })
        }
    }


    return (
        <div className="signup-div">
            <Card className="signup-card">
                <CardBody>
                    <CardTitle tag="h2">
                        Petly Signup
                    </CardTitle>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="signup-username">
                                Username
                            </Label>
                            <Input id="signup-username" name="username" palceholder="" value={signupForm.username} onChange={handleChange} required />
                            {errors.username && <p style={{
                                color: "red"
                            }}>{errors.username}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="signup-password">
                                Password
                            </Label>
                            <Input id="signup-password" name="password" value={signupForm.password} onChange={handleChange} required />
                            {errors.password && <p style={{
                                color: "red"
                            }}>{errors.password}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="signup-firstName">
                                First Name
                            </Label>
                            <Input id="signup-firstName" name="firstName" value={signupForm.firstName} onChange={handleChange} required />
                            {errors.firstName && <p style={{
                                color: "red"
                            }}>{errors.firstName}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="signup-lastName">
                                Last Name
                            </Label>
                            <Input id="signup-lastName" name="lastName" value={signupForm.lastName} onChange={handleChange} required />
                            {errors.lastName && <p style={{
                                color: "red"
                            }}>{errors.lastName}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="signup-email">
                                Email
                            </Label>
                            <Input id="signup-email" name="email" value={signupForm.email} onChange={handleChange} required />
                            {errors.email && <p style={{
                                color: "red"
                            }}>{errors.email}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="signup-zipCode">
                                Zip Code
                            </Label>
                            <Input id="signup-zipCode" name="zipCode" value={signupForm.zipCode} onChange={handleChange} />
                        </FormGroup>
                        <Button onClick={handleClick} color="primary">
                            Signup
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Signup

