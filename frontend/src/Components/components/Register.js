import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        conPassword: "",
    });
    const [FirstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [workError, setWorkError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [conPasswordError, setConPasswordError] = useState("")

    // let name, value;
    const { firstName, lastName, email, phone, work, password, conPassword } = user;

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
            setLastNameError("Enter your LastName.")
            setFirstNameError("");
            return;
        }
        else {
            setLastNameError("");
        }
        if (email === null || email.trim().length === 0) {
            setLastNameError("Enter your email.")
            return;
        }

        const resp = await axios.post('/register', {
            firstName, lastName, email, phone, work, password, conPassword
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
                                name="phone"
                                type="phone"
                                className="form-control mt-1"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={handleChanged}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Work</label>
                            <TextField
                                name="work"
                                type="text"
                                className="form-control mt-1"
                                placeholder="Work"
                                value={work}
                                onChange={handleChanged}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <TextField
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
    );
};

export default Register;
