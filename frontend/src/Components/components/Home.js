import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../App.css'

const Home = () => {
    const [userShow, setUserShow] = useState(false);
    const [userName, setUserName] = useState({})
    const ContactUsFun = async () => {


        try {
            const resp = await axios.get('/contactData', {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            setUserName(resp.data);
            setUserShow(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        ContactUsFun()
    }, [])
    return (
        <div className='home'>
            <Typography style={{ color: "blue", fontWeight: 600 }}>Welcome</Typography>
            <Typography>{userName.firstName} {userName.lastName}</Typography>
            <Typography>{userShow ? "Happy! to see you Again!" : "We Are MERN Developer"}</Typography>
        </div>
    )
}

export default Home