const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const router = express.Router();
require("../database/conn");
const User = require("../users/Models/usersSchema");
const auth = require("../middleware/atuntication")

router.get("/", (req, resp) => {
    resp.send(`<h2>Welcome to Home Page router</h2>`);
});



router.post("/register", async (req, resp) => {
    console.log("call register");
    const { firstName, lastName, email, phone, organization, password, conPassword } =
        req.body;
    console.log("firstName===>", firstName);
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !organization ||
        !password ||
        !conPassword
        // nocosaz @mailinator.com
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
                organization,
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
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.status(400).json({ error: "Enter tha data" });
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const passMatch = await bcrypt.compare(password, userLogin.password)

            token = await userLogin.generateAuthToken()
            console.log("token", token);

            resp.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!passMatch) {
                resp.status(400).json({ message: "user error" });
            } else if (passMatch) {
                resp.status(200).json({ message: "Signin Sucessfull" });
            }
        }
        else {
            resp.status(400).json({ message: "Invalid data" });
        }


    } catch (err) {
        console.log(err);
    }
    //   console.log(req.body);
    //   resp.json({ message: "login data" });
});

//About Page

router.get('/about', auth, (req, resp) => {
    resp.cookie("Test", 'Deepak')
    resp.send(req.rootUser);

})

//Contact Page

router.get('/contactData', auth, (req, resp) => {
    resp.cookie("Test", 'Deepak')
    resp.send(req.rootUser);

})
router.post('/contact', auth, async (req, resp) => {
    try {
        const { firstName, email, phone, message } = req.body;

        if (!firstName || !email || !phone || !message) {
            console.log("Please full fil the data")
            return resp.json({ error: "pls fill the data" })
        }
        const userContact = await User.findOne({ _id: req.userID })

        if (userContact) {
            const userMessage = await userContact.addMessage(firstName, email, phone, message);
            await userContact.save();
            resp.status(201).json({ message: "User message 1" })
        }
        // console.log(userMessage, "Hello")
    } catch (err) {
        console.log(err)
    }

})
// Logout Router
router.get('/logout', (req, resp) => {
    resp.clearCookie("jwtoken", { path: '/' })
    resp.send("User Logout");

})
router.get('/', (req, resp) => {
    resp.clearCookie("jwtoken", { path: '/' })
    resp.send("User Logout");

})

router.get('/user', async (req, resp) => {
    const userData = await User.find();
    if (userData.length > 0) {
        resp.send(userData);
    }
    else {
        console.log({ Error: "User Not Found" })
    }
})

// recordRoutes.route("/:id").delete((req, response) => {
//     let myquery = { _id: ObjectId(req.params.id) };
//     collection("user").deleteOne(myquery, function (err, obj) {
//         if (err) throw err;
//         console.log("1 document deleted");
//         response.json(obj);
//     });
// });

router.get('/gettinguserdata/:id', async (req, res) => {
    try {
        let result = await User.findOne({ _id: req.params.id })
        res.status(200).send(result)
    }
    catch (err) {
        res.status(400).send({ Error: err })
    }
})

router.delete('/deluser/:id', async (req, resp) => {
    try {
        let userDel = await User.deleteOne({ _id: req.params.id })
        resp.status(200).send(userDel)
        // console.log("User Delete")
    } catch (error) {
        resp.status(400).json({ message: `User not Delete ${error}` })
    }
})

router.put('/update/:id', async (req, resp) => {
    let userUpdate = await User.updateOne(
        { _id: req.params.id },
        {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                organization: req.body.organization,
            }
        }
    )
    resp.send(userUpdate)
})
// To Delete the Users 
// router.delete('/deluser/:id', async (req, res) => {
//     try {
//         let result = await User.deleteOne({ _id: req.params.id })
//         res.status(200).send(result)
//     }
//     catch (err) {
//         res.status(400).send({ Error: err })
//     }
// })




module.exports = router;
