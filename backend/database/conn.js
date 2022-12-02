const mongoose = require('mongoose')

const DB = process.env.DATABASE_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connection Successfull`);
}).catch((err) => {
    console.log(err, "Connection Unsuccessful")
})