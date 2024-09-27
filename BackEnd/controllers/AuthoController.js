const ProdigyUser=require('../models/UserModel');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const errorHandler = require('../utils/Error');


const signUp=async (req,res,next)=>{
    const {username,email,password,role}=req.body;
    if(!username || !email ||!password ||username==='' ||email==='' ||password===''){
        //res.status(400).json({message:"All fields are required"});
        next(errorHandler(400,"All fields are required"))
    }
    const hashedPassword=bcryptjs.hashSync(password,10);

    const newUser=new ProdigyUser({
        username,
        email,
        password:hashedPassword,
        role,
    })
    try{
    await newUser.save();
    res.json("signed up successfully");
    }catch(error){
        next(error);
    }
}

const signIn=async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password ||email===''||password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    try{
        const validUser=await ProdigyUser.findOne({ email });
        if(!validUser){
           return next(errorHandler(404,"user not found"));
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            next(errorHandler(400,"wrong credentials: invalid user or password"));
        }
        const token=jwt.sign({id:validUser._id,role:validUser.role},process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc;
        res
        .status(200)
        .cookie('access_token',token,{httpOnly:true})
        .json(rest);
    }catch(error){
        next(error);
    }
}

module.exports={signUp,signIn};