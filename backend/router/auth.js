const express = require('express')
const router = express.Router();
require('../database/conn')
const User = require('../users/Models/usersSchema')

router.get('/', (req, resp) => {
    resp.send(`<h2>Welcome to Home Page router</h2>`)
})


router.post('/register', async (req, resp) => {

    const { firstname, lastname, email, phone, work, password, conpassword } = req.body

    if (!firstname || !lastname || !email || !phone || !work || !password || !conpassword) {
        return resp.status(422).json({ error: "Please fill the all required data" })
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return resp.status(422).json({ error: "User already exist" });
        }
        const user = new User([firstname, lastname, email, phone, work, password, conpassword]);

        console.log(user)
        await user.save();
        resp.status(201).json({ message: "User sucessful registered" });
    }
    catch (error) {
        console.log(error)
    }
    // console.log(req.body)
    // resp.json({ message: req.body })
    // resp.send('Register page')
})

///////////////////////////
// router.post('/register', (req, resp) => {

//     const { firstname, lastname, email, phone, work, password, conpassword } = req.body

//     if (!firstname || !lastname || !email || !phone || !work || !password || !conpassword) {
//         return resp.status(422).json({ error: "Please fill the all required data" })
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return resp.status(422).json({ error: "User already exist" });
//             }
//             const user = new User([firstname, lastname, email, phone, work, password, conpassword]);
//             // const user = new User(req.body);
//             console.log(user)
//             user.save()
//                 .then(() => {
//                     resp.status(201).json({ message: "User sucessful registered" });
//                 })
//                 .catch((err) => resp.status(500).json({ err: "Register failed" }))
//         })
//         .catch((error) => console.log(error))

//     // console.log(req.body)
//     // resp.json({ message: req.body })
//     // resp.send('Register page')
// })

router.post('/login', (req, resp) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return resp.status(400).json({ error: "Enter tha data" })
        }

    } catch (err) {
        console.log(err)
    }
    console.log(req.body);
    resp.json({ message: "login data" })
})



module.exports = router