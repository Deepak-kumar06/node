import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../App"

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const logoutFun = async () => {
        try {
            const resp = await axios.get('/logout', {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            dispatch({ type: "USER", payload: false })
            navigate('/login', { replace: true })
            if (!resp === 200) {
                const error = new Error(resp.error);
                throw error;
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        logoutFun()
    })
    return (
        <div>Logout</div>
    )
}

export default Logout