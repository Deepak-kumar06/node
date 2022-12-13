const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
// const data = require('./Data')

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;

require('./database/conn');


const app = express();
app.use(cookieParser())
app.use(cors());
app.use(express.json())
app.use(require('./router/auth'))
app.use(bodyParser.urlencoded({ extended: false }));

// const hello = [{ title: "Hello,world (again)" }];

// app.use(helmet());

// app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan("compined"));

// app.get("/", (req, resp) => {
//     resp.send(hello);
// });

//Routing

app.get('/', (req, resp) => {
    resp.send(`<h2>Welcome to Home Page`)
})

// app.get('/about', (req, resp) => {
//     resp.send(`<h2>Welcome to About Page`)
// })

app.get('/help', (req, resp) => {
    resp.send(`<h2>Welcome to Help Page`)
})

app.listen(PORT, () => {
    console.log(`server running on PORT NUMBER ${PORT}`);
});
// app.use(core("http://localhost:5000"))

// http.createServer((req, resp) => {
//     resp.writeHead(200, { 'Content-Type': 'applicatin/json' })
//     resp.write(JSON.stringify(data));
//     resp.end();
// }).listen(5000);
