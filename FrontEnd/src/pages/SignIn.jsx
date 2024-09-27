import { Link,useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { useState } from "react";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/UserSlice";
import { useDispatch,useSelector } from "react-redux";

const SignIn = () => {
  const [formData,setFormData]=useState({});
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading,error:errorMessage}=useSelector(state=>state.user);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("please fill all the requred fields"));
      
    }
    try{
      dispatch(signInStart());
        const res=await fetch('/api/authentication/signin',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
          });
          const data=await res.json();
         if(data.success=== false){
         return dispatch(signInFailure(data.message));
         }
         if(res.ok){
          dispatch(signInSuccess(data))
          navigate('/');
         }
    }catch(error){
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='flex justify-center ml-8 mr-8 w-full mx-auto md:ml-40 mt-20 bg-sky-300 md:w-2/4'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label value="Your Email:" className="flex text-start"/>
              <TextInput 
              type="email"
              placeholder="user@gmail.com"
              id="email"
              onChange={handleChange}
              className="flex text-start"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Your password:" className="text-start" />
              <TextInput 
              type="password"
              placeholder="********"
              id="password"
              onChange={handleChange}
              className="flex text-start"
              />
            </div>
            <Button  type="submit" disabled={loading}
            className="bg-green-500 text-white w-[100px] px-2 py-0.5"
            >
              {loading?(
              <>
              <Spinner size="sm"/>
              <span className="p-3">loading</span>
              </>):(
                 "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>have not an account?</span>
            <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
          </div>
          <div>
          {errorMessage &&(
            <Alert className="mt-4" color="failure">
               {errorMessage}
            </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn