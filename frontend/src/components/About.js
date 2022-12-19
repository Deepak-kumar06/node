import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { TextField } from "@mui/material";
import axios from "axios";

const About = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const callAboutPageFun = async () => {
        try {
            const resp = await axios.get('/about', {
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                // credentials: "include"
            });
            console.log("resp", resp)
            setUserData(resp.data);
            console.log(userData)
            if (!resp === 200) {
                const error = new Error(resp.error);
                throw error;
            }
        } catch (err) {
            console.log(err)
            // navigate('/login')
        }
    }

    useEffect(() => {
        callAboutPageFun()
    }, [])


    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            alt=""
                        />
                        <span className="font-weight-bold">{userData.firstName}</span>
                        <span className="text-black-50"> {userData.email}</span>
                        <span> </span>
                    </div>
                </div>
                <div className="col-md-7 border-right">
                    <div className="pt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <label className="labels">First Name</label>
                            <TextField
                                autoComplete="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={userData.firstName}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Last Name</label>
                            <TextField
                                autoComplete="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={userData.lastName}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Email ID</label>
                            <TextField
                                autoComplete="email"
                                type="text"
                                className="form-control"
                                placeholder="enter email id"
                                value={userData.email}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Mobile Number</label>
                            <TextField
                                autoComplete="phone"
                                type="phone"
                                className="form-control"
                                placeholder="Phone Number"
                                value={userData.phone}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Organization</label>
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="Organization"
                                value={userData.organization}
                            />
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        <button className="btn btn-primary profile-button" type="button">
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
