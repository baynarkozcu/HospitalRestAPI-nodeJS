const router = require('express').Router();
const User = require('../models/userModel');
const httpErrors = require('http-errors');
const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) => {
    const allUser = await User.find({});
    res.json(allUser);
    try {

    } catch (error) {
        next(httpErrors(404, error));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        next(httpErrors(404, error));
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        const {error, result} = user.joiValidation();
        if(error){
            next(httpErrors(400, error));
        }else{
            const result = await user.save();
            res.json(result);
        }
    } catch (error) {
        next(httpErrors(404, error));
    }
});

router.patch('/:id', async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if(req.body.hasOwnProperty('password')){
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = new User(req.body);
    const {error, result} = user.joiValidationForUpdate();
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
});

router.delete('/:id', async (req, res, next) => {
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
});





module.exports = router;