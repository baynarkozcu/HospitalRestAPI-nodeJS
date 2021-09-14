const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const httpErrors = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
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
    mail:Joi.string().email().required(),
    password:Joi.string().min(8).trim(),
    department:Joi.string().trim(),
    position:Joi.string().min(3).max(35).trim(),
});


UserSchema.methods.joiValidation = (user)=>{
    joiSchema.required();
    return joiSchema.validate(user);
}

UserSchema.methods.joiValidationForUpdate = (user)=>{
    return joiSchema.validate(user);
}

UserSchema.methods.generateToken = async function(){
    const user = this;
    const token = await jwt.sign({
        _id: user._id,
        mail: user.mail,
    }, "secretkey", {expiresIn: "1h"});

    return token;
}

UserSchema.statics.login = async(mail, password)=>{

    const user = await User.findOne({mail});

    if(!user){
        return httpErrors(404, "Email Not Found");
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if(!checkPass){
        return httpErrors(400, "Mail / Password Not Correct");
    }

    return user;

}


const User = mongoose.model('User', UserSchema);

module.exports = User;