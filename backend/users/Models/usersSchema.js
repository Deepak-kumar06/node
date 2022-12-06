const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conPassword: {
        type: String,
        required: true
    },
});

userSchema.pre('save', async function (next) {
    console.log("hbfklsdghslgvblkqhy")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.conPassword = await bcrypt.hash(this.conPassword, 12);
    }
    next();
})

const userModel = mongoose.model('MERN ', userSchema);

module.exports = userModel;