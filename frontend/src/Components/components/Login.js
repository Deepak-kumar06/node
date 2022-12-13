import React, { useContext, useState, } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/Validation';
import { TextField } from '@mui/material'
import axios from 'axios';

import { UserContext } from "../../App"

const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();
        if (email === null || email.trim().length === 0) {
            setEmailError("Please enter email address.");
            // alert("Please enter email address.")
            return;
        }
        else if (!validateEmail(email)) {
            setEmailError("Please enter valid Email address.")
            alert("Please enter valid Email address.")
            return;
        }
        else {
            setEmailError("")
        }

        if (password === null || password.trim().length === 0) {
            setPasswordError("Please enter password.")
            alert("Please enter password.")
            return;
        }
        else {
            setPasswordError("")
        }
        try {
            const resp = await axios.post('/login', {
                email: email, password: password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // const data = await resp.json();
            console.log("resp.status===>>", resp.status);
            console.log("resp ====>>", resp);
            if (resp.status === 200) {
                dispatch({ type: "USER", payload: true })
                console.log("data", resp)
                // alert("Login Successfull")
                navigate('/')
                // console.log("Login", data)
            } else if (resp.status === 400) {
                console.log(resp, state, "Hello state")
                alert('Invalid Credentials------------------------->>>>>>>> ')
                console.log('Fukfadsjlf;kdjsa;lkf-------------------------->>>>')
            }
        } catch (e) {

            console.log("e=====>", e);
        }

    }


    return (
        <div className="Auth-form-container">
            <form className="Auth-form-login" onSubmit={loginUser} >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <TextField
                            autoComplete='email'
                            type="text"
                            error={emailError.length > 0}
                            helperText={emailError}
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* {emailError.trim().length > 0 ? <label style={{ color: "red" }}>{emailError}</label> : <label style={{ color: "red" }}>{emailError}</label>} */}
                        {/* {emailError === 1 ? <label style={{ color: "red" }}>{emailError}</label> : null} */}

                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <TextField
                            autoComplete='password'
                            error={passwordError.length > 0}
                            helperText={passwordError}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* {passwordError.length > 0 ? <label style={{ color: "red" }}>{passwordError}</label> : null} */}

                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className='g-5'>
                        <p className="forgot-password text-right mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                        <div className="text-center">
                            Not have a
                            <NavLink to={"/register"} className="link-primary">
                                Register
                            </NavLink>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login