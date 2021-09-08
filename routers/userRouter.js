const router = require('express').Router();
const User = require('../models/userModel')

router.get('/', async (req, res)=>{
    const allUser = await User.find({});
    res.json(allUser);
    try{

    }catch(error){
        console.log(`userRouter Get All User Method Errors : ${error}`); 
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const user = await User.findById({_id:req.params.id});
        res.json(user);
    }catch(error){
        console.log(`userRouter Get Single User Method Errors : ${error}`); 
    }
});

router.post('/', async (req, res)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.json(result);
    }catch(error){
        console.log(`userRouter Post Create User Method Errors : ${error}`);
    }
});

router.patch('/:id', async (req, res)=>{
    try{
        const user = await User.findByIdAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators: true });
        if(user){
            return res.json(user);
        }else{
            return res.status(400).json({
                "message": "Wrong!!"
            });
        }
    }catch(error){
        console.log(`userRouter Update Single User Method Errors : ${error}`); 
    }
});

router.delete('/:id',  async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete({_id:req.params.id});
        if(user){
            return res.json(user);
        }else{
            return res.status(400).json({
                "message": "User Not Found!!"
            });
        }
    }catch(error){
        console.log(`userRouter Delete Single User Method Errors : ${error}`); 
    }
});





module.exports = router;