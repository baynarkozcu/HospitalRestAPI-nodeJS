const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
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



const joiSchema = Joi.object({
    name:Joi.string().min(3).max(35).trim(),
    age:Joi.number().min(10).max(100),
    gender:Joi.string(),
    mail:Joi.string().trim().email(),
    password:Joi.string().min(8).trim(),
    department:Joi.string().trim(),
    position:Joi.string().min(3).max(35).trim(),
});


schema.methods.joiValidation = (user)=>{
    joiSchema.required();
    return joiSchema.validate(user);
}

schema.methods.joiValidationForUpdate = (user)=>{
    return joiSchema.validate(user);
}


const User = mongoose.model('User', schema);

module.exports = User;