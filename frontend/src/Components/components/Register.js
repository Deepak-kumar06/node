import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

    // let name, value;
    const { firstName, lastName, email, phone, work, password, conPassword } = user;

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const submitData = async (e) => {
        e.preventDefault();
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
                        <input
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
                        <input
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
                        <input
                            name="email"
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            onChange={handleChanged}
                        />
                        <div className="form-group mt-3">
                            <label>Phone</label>
                            <input
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
                            <input
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
                            <input
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
                        <input
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
