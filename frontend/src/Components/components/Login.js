import React, { useState, } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/Validation';
import axios from 'axios';


const Login = () => {
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
        console.log("Login sucessful", this.props);
        const resp = await axios.post('/login', {
            email: email, password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (resp.status === 200) {
            console.log(resp)
            // alert("Login Successfull")
            navigate('/')
            // console.log("Login", data)
        } else {
            alert('Invalid Credentials ')
        }
        console.log(resp, "Hello")
    }


    return (
        <div className="Auth-form-container">
            <form className="Auth-form-login" onSubmit={loginUser} >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            error={emailError}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError.trim().length > 0 ? <label style={{ color: "red" }}>{emailError}</label> : <label style={{ color: "red" }}>{emailError}</label>}
                        {/* {emailError === 1 ? <label style={{ color: "red" }}>{emailError}</label> : null} */}

                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            error={passwordError}
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