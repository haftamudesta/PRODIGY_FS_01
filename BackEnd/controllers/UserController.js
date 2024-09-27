const bcryptjs=require('bcryptjs');
const errorHandler = require("../utils/Error");
const ProdigyUser = require('../models/UserModel');

const updateUser =async (req,res,next)=>{
    if(req.user.id!==req.params.userId){
      return  next(errorHandler(403,'you are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,"password must be greater than 6 characters"));
        } 
    req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.lenth < 7 || req.body.username.lenth > 20){
            return next(errorHandler(400,'username should be between 7 and 20 character'));
        }
        // if(req.body.username.include(' ')){
        //     next(errorHandler(400,'username should not include space'));
        // }
        if(req.body.username!==req.body.username.toLowerCase()){
            next(errorHandler(400,'username should be in lower case'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]*$/)){
            next(errorHandler(400,'username should be letters and numbers'));
        }
    }
    try{
        const updatedUser=await ProdigyUser.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            },
        },
        {new:true}
        );
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
}

const deleteUser =async (req,res,next)=>{
    if(req.user.role!=="admin" && req.user.id!==req.params.userId){
        return  next(errorHandler(403,'you are not allowed to delete this user'));
      }
    try{
        await ProdigyUser.findByIdAndDelete(req.params.userId);
        res.status(200).json("user has been deleted successfully");
    }catch(error){
        next(error);
    }
}
const signOut = (req,res,next)=>{
    try{
        res.clearCookie('access_token').status(200).json('you have signed out successfully');
    }catch(error){
        next(error.message)
    }
}
const getUsers =async (req,res,next)=>{
    if(req.user.role!=="admin"){
        next(errorHandler(403,"you do not have access to all users"))
    }
    try{
        const startIndex=parseInt(req.body.startIndex) || 0;
        const limit=parseInt(req.body.limit) || 0;
        const sortDirection=req.body.sort==='asc'?1:-1;
        const users=await ProdigyUser.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit)
        const usersWithOutPassword=users.map(user=>{
           const {password,...rest}=user._doc;
           return rest;
        })
        const totalUsers=await ProdigyUser.countDocuments();
        const now=new Date();
        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate(),
        )
        const lastMonthUsers=await MernUser.countDocuments(
            {createdAt:{$gte:oneMonthAgo}}
        )
        res.status(200).json({
            users:usersWithOutPassword,
            totalUsers,
            lastMonthUsers
        })
    }catch(error){
        next(error);
    }
}


const getUser =async (req,res,next)=>{
    try{
        const user=await ProdigyUser.findById(req.params.userId);
        console.log(user)
        if(!user){
            return next(errorHandler(404,"user not found"));
        }
        const {possword,...rest}=user._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error)
    }
}
module.exports={updateUser,deleteUser,signOut,getUsers,getUser};