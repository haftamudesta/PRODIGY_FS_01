const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["admin","user"]
    }
},{timestamps:true})

const ProdigyUser=mongoose.model('ProdigyUser',userSchema);
module.exports=ProdigyUser;