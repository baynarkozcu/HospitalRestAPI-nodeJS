const User = require('../models/userModel');
const httpErrors = require('http-errors');
const bcrypt = require('bcrypt');


const allUserForAdmin = async (req, res, next) => {
    try {
        const allUser = await User.find({});
        res.json(allUser);
    } catch (error) {
        next(httpErrors(404, error));
    }
}

const meInfo = (req, res, next) => {
    res.json(req.user);
}

const getSingleUserById = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        next(httpErrors(404, error));
    }
}


const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        const {error, result} = user.joiValidation(req.body);
        if(error){
            next(httpErrors(400, error));
        }else{
            const result = await user.save();
            res.json(result);
        }
    } catch (error) {
        next(httpErrors(404, error));
    }
}


const updateUserById = async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if(req.body.hasOwnProperty('password')){
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = new User(req.body);
    const {error, result} = user.joiValidationForUpdate(req.body);
    if(error){
        next(httpErrors(400, error));
    }else{
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (user) {
                return res.json(user);
            } else {
                throw httpErrors(404, 'User not found');
            }
        } catch (error) {
            next(httpErrors(404, error));
        }
    }
}


const deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        if (user) {
            return res.json(user);
        } else {
            throw httpErrors(404, 'User not found');
        }
    } catch (error) {
        next(httpErrors(404, error));
    }
}


const login = async(req, res, next)=>{
    try{
        const user = await User.login(req.query.mail, req.query.password);
        const token = await user.generateToken();
        res.json({
            user,
            token
        });

    }catch (error){
        next(error);
    }
}


module.exports = {
    allUserForAdmin,
    meInfo,
    getSingleUserById,
    createUser,
    updateUserById,
    deleteUserById,
    login,
}


