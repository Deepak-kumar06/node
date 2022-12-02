const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
// const data = require('./Data')

dotenv.config({ path: './config.env' })

require('./database/conn');

const User = require('./users/Models/usersSchema')

const PORT = process.env.PORT;

const app = express();

// const hello = [{ title: "Hello,world (again)" }];

// app.use(helmet());

// app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan("compined"));

// app.get("/", (req, resp) => {
//     resp.send(hello);
// });

app.listen(PORT, () => {
    console.log(`server running on PORT NUMBER ${PORT}`);
});

// http.createServer((req, resp) => {
//     resp.writeHead(200, { 'Content-Type': 'applicatin/json' })
//     resp.write(JSON.stringify(data));
//     resp.end();
// }).listen(5000);
