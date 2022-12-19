import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import { validateEmail, validatePassword } from '../utils/Validation'
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        password: "",
        conPassword: "",
    });
    const [FirstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [organizationError, setOrganizationError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [conPasswordError, setConPasswordError] = useState("")

    // let name, value;
    const { firstName, lastName, email, phone, organization, password, conPassword } = user;

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    };
    const submitData = async (e) => {
        e.preventDefault();
        if (firstName === null || firstName.trim().length === 0) {
            setFirstNameError("Enter your FirstName.")
            return;
        }
        if (lastName === null || lastName.trim().length === 0) {
            setFirstNameError("");
            setLastNameError("Enter your LastName.")
            return;
        }
        if (email === null || email.trim().length === 0) {
            setLastNameError("");
            setEmailError("Enter your email.")
            return;
        }
        // else if (!validateEmail(email)) {
        //     setEmailError("Please enter valid email or correct formate ")
        // }
        if (phone === null || phone.trim().length === 0) {
            setEmailError("");
            setPhoneError("Please Enter your Phone Number.")
            return;
        }
        if (organization === null || organization.trim().length === 0) {
            setPhoneError("");
            setOrganizationError("Please Enter your Phone Number.")
            return;
        }

        if (password === null || password.trim().length === 0) {
            setOrganizationError("");
            setpasswordError("Enter your password.")
            return;
        }
        // else if (!validatePassword(password)) {
        //     setpasswordError("Please enter at least one number, one lowercase and one uppercase letter minimum six characters")
        // }
        if (conPassword === null || conPassword.trim().length === 0) {
            setpasswordError("")
            setConPasswordError("Enter your Confirm Password.")
            return;
        }
        else if (password !== conPassword) {
            setConPasswordError("Confirm Password should be match with Password.")
        }
        else {
            setConPasswordError("")
        }


        const resp = await axios.post('/register', {
            firstName, lastName, email, phone, organization, password, conPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            if (data.status === 201) {
                navigate('/login')
                alert("registration Successfull")
                console.log("resp", resp)
            } else if (data.status === 422) {
                console.log("Invalid Details")
                alert("Invalid Details")
            }
        })
    }

    return (
        <>
            <div className="Auth-form-container overflow-auto">
                <form className="Auth-form" method="POST" onSubmit={submitData}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Already registered?{" "}
                            <NavLink to={"/login"} className="link-primary">
                                Sign In
                            </NavLink>
                        </div>
                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <TextField
                                error={FirstNameError.length > 0}
                                helperText={FirstNameError}
                                name="firstName"
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                value={firstName}
                                onChange={handleChanged}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <TextField
                                error={lastNameError.length > 0}
                                helperText={lastNameError}
                                name="lastName"
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Kumar"
                                value={lastName}
                                onChange={handleChanged}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <TextField
                                error={emailError.length > 0}
                                helperText={emailError}
                                name="email"
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                value={email}
                                onChange={handleChanged}
                            />
                            <div className="form-group mt-3">
                                <label>Phone</label>
                                <TextField
                                    error={phoneError.length > 0}
                                    helperText={phoneError}
                                    name="phone"
                                    type="phone"
                                    className="form-control mt-1"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={handleChanged}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Organization</label>
                                <TextField
                                    error={organizationError.length > 0}
                                    helperText={organizationError}
                                    name="organization"
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Organization"
                                    value={organization}
                                    onChange={handleChanged}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <TextField
                                    error={passwordError.length > 0}
                                    helperText={passwordError}
                                    name="password"
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChanged}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
                            <TextField
                                error={conPasswordError.length > 0}
                                helperText={conPasswordError}
                                name="conPassword"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Confirm Password"
                                value={conPassword}
                                onChange={handleChanged}
                                autoComplete="off"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
