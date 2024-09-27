const express=require('express');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const cors=require('cors')
dotenv.config();
const DBConnection=require('./DBConnection')
const userRoutes=require('./routes/UserRoutes')
const authenticationRoutes=require('./routes/AuthoRoutes');


const server=express();
 server.use(express.json());
 server.use(cookieParser());
 server.use(cors());

 const PORT=process.env.PORT || 6002;
 server.use('/api/user',userRoutes);
server.use('/api/authentication',authenticationRoutes);

 DBConnection().then(()=>{
        try{
         server.listen(PORT,()=>{
             console.log(`server is running on port ${PORT}`);
         })
        } catch(error){
         console.log("Database Connection Error")
         process.exit(1)
        }
 }).catch(error=>{
     console.log("Invalid Database Connection")
     process.exit(1)
 });


 server.use((error,req,res,next)=>{
        const statusCode=error.statusCode || 500;
        const message=error.message ||"Internal servrt error";
        res.json({
            success:false,
            statusCode,
            message,
        });
        next();
    })