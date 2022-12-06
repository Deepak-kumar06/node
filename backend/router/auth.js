const express = require("express");
const bcrypt = require('bcryptjs')
const router = express.Router();
require("../database/conn");
const User = require("../users/Models/usersSchema");

router.get("/", (req, resp) => {
    resp.send(`<h2>Welcome to Home Page router</h2>`);
});

router.post("/register", async (req, resp) => {
    const { firstName, lastName, email, phone, work, password, conPassword } =
        req.body;
    console.log("firstName===>", firstName);
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !work ||
        !password ||
        !conPassword
    ) {
        return resp
            .status(422)
            .json({ error: "Please fill the all required data" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return resp.status(422).json({ error: "User already exist" });
        } else if (password != conPassword) {
            return resp.status(422).json({ error: "Confirm password not match" });
        } else {
            const user = new User({
                firstName,
                lastName,
                email,
                phone,
                work,
                password,
                conPassword,
            });

            console.log(" user==>>", user);
            await user.save();
            resp.status(201).json({ message: "User sucessful registered" });
        }
    } catch (error) {
        console.log(error);
    }
});

// login router

router.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.status(400).json({ error: "Enter tha data" });
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const passMatch = await bcrypt.compare(password, userLogin.password)

            if (!passMatch) {
                resp.json({ message: "user error" });
            } else {
                resp.status(400).json({ message: "Sighnin Sucessfull" });
            }
        } else {
            resp.json({ message: "Invalid data" });
        }


    } catch (err) {
        console.log(err);
    }
    //   console.log(req.body);
    //   resp.json({ message: "login data" });
});

module.exports = router;
