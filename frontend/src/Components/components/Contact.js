import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'

const Contact = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ firstName: "", email: "", phone: "", message: "" })
    const ContactUsFun = async () => {
        try {
            const resp = await fetch('/contactData', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await resp.json();
            console.log("data", data)
            setUserData({ ...userData, firstName: data.firstName, email: data.email, phone: data.phone });
            if (!resp === 201) {
                const error = new Error(resp.error);
                throw error;
            }
        } catch (err) {
            console.log(err)
            navigate('/contact')
        }
    }

    useEffect(() => {
        ContactUsFun()
    }, [])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const { firstName, email, phone, message } = userData;

        const resp = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, email, phone, message
            })
        });
        const data = await resp.json();

        if (!data) {
            console.log("Meassage no send")
        }
        else {
            alert("Meassage send")
            setUserData({ ...userData, message: "" })
        }

    }

    return (
        <div className="container mt-5">
            <div className='row text-center my-4 px-6'>
                <div className='col-md-4 justify-content-between m-auto'>
                    <div className='card m-3'>
                        <h1>Hello</h1>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card m-3'>
                        <h1>Hello</h1>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card m-3'>
                        <h1>Hello</h1>
                    </div>
                </div>
            </div>
            <h2 className="mb-3">Contact</h2>
            <form onSubmit={submitHandler} method="POST">
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <TextField
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder='Name'
                        className="form-control"
                        value={userData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Email'
                        className="form-control"
                        onChange={handleInputChange}
                        value={userData.email}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="phone">
                        Phone
                    </label>
                    <TextField
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder='Phone'
                        className="form-control"
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="message">
                        Message
                    </label>
                    <TextField multiline
                        rows={4}
                        id="message"
                        name="message"
                        type="text"
                        placeholder='Message'
                        className="form-control"
                        onChange={handleInputChange}
                        value={userData.message}
                    />
                </div>
                <button className="btn btn-danger" type="submit">
                    Contact Us
                </button>
            </form>
        </div>
    )
}

export default Contact