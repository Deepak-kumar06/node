const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

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
        type: String,
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
    tokens: [
        {
            token: {
                type: String, required: true
            }
        }]
});

userSchema.pre('save', async function (next) {
    console.log("hbfklsdghslgvblkqhy")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.conPassword = await bcrypt.hash(this.conPassword, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        console.log(token)
        this.tokens = await this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}

const userModel = mongoose.model('MERN ', userSchema);

module.exports = userModel;