const express=require('express');
const route=express.Router();
const {signUp,signIn}=require('../controllers/AuthoController.js')

route.route('/signup').post(signUp);//option one
route.post('/signin',signIn);//option two

module.exports=route;