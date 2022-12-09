import React from 'react'
import { TextField } from '@mui/material'

const Contact = () => {
    return (
        <div className="container mt-5">
            <h2 className="mb-3">Contact</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <TextField
                        placeholder='Name'
                        className="form-control" type="text" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <TextField
                        placeholder='Email'
                        className="form-control" type="email" id="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="message">
                        Message
                    </label>
                    <TextField multiline
                        rows={4}
                        placeholder='Message'
                        className="form-control" id="message" />
                </div>
                <button className="btn btn-danger" type="submit">
                    Contact Us
                </button>
            </form>
        </div>
    )
}

export default Contact