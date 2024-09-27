import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = () => {
  const {currentUser}=useSelector(state=>state.user);
  const [users,setUsers]=useState([]);
  const [authorization,setAuthorization]=useState("")
        useEffect(()=>{
          const fetchUsers=async ()=>{
                  try{
                          const res=await fetch('/api/user/getUsers');
                          const data=await res.json();
                          console.log(data)
                          if(res.ok){
                                  setUsers(data.users);
                          }
                  }catch(error){
                          console.log(error.message)  
                  }
          }
          if(currentUser?.role=="admin"){
                  fetchUsers();  
          }else{
            setAuthorization("You do not have Authorization to access this page!!")
          }
  },[currentUser]) 
  //currentUser._id,currentUser.role
  console.log(users)
  return (
    <div>
      {
        authorization &&(
          <h1 className="text-2xl text-red-500 font-semibold mt-20">{authorization}</h1>
        )
      }
      <h1 className="text-pink-400">Only Admin user have access to this page</h1>
      <Link to='/about'>
      <button className="bg-green-500 text-white px-2 py-0.5 border-2 border-gray-600 mt-2">
        Navigate To About
      </button>
      </Link>
    </div>
  )
}
