import { Link,useNavigate} from "react-router-dom";
import {useSelector,useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/UserSlice";
const NavBar = () => {
  const {currentUser}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const handleSignOut =async()=>{
    try{
            const res=await fetch('/api/user/signout',{
                    method:'POST',
            })
            const data=await res.json();
            if(!res.ok){
                    console.log(data)
            }else{
                    dispatch(signoutSuccess());
                    navigate('/sign-in')
            }
    }catch(error){
            console.log(error.message)
    }
 }
  return (
    <div className="flex justify-between bg-sky-500 h-[60px] items-center pl-4 pr-4">
      <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"><span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-4">User</span>Authentication
      and Authorization </Link>
      <Link to='/' className="text-white">Home</Link>
        {currentUser?(
          <div> 
              <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ):(
          <Link to='/sign-in' className="text-white">
          <button>
            Sign In
          </button>
          </Link>
        )
        }
    </div>
  )
}
export default NavBar