const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 35
    },
    age: {
        type: Number,
        max: 100,
        min: 18,
    },
    gender: {
        type: String,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxLength: 35
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxLength: 36
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 35
    }
}, {collection: "users" ,timestamps: true});


const User = mongoose.model('User', schema);

module.exports = User;