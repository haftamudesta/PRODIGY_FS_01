import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

const About = () => {
        const {currentUser}=useSelector(state=>state.user);
  return (
    <div>
        {
                currentUser &&(
                        <div>
                                <h1 className="text-gray-500 text-3xl font-bold">Hi {currentUser.username}</h1>
                                <h1 className="text-green-600 text-3xl font-bold mb-4 mt-4">This is secured authentication and authorization project</h1>
                                <p className="text-start lg:ml-40 lg:mr-40 w-2/3">It is a show case of authorization and authentication implemented as per the requirements of <strong>Prodigy InfoTech</strong> for my Full Stack interniship program at <span className="text-3xl text-purple-700 font-semibold">Prodigy InfoTech</span> </p>
                                <h3 className="text-start lg:ml-40 lg:mr-40 mt-2">Implemented By:<Link to="https://www.linkedin.com/in/haftamudesta/" className="text-blue-700 font-bold ml-2">Haftamu Desta</Link></h3>
                        </div>
                )
        }
        {!currentUser&&(
                <div className="mt-4 font-medium">
                        <h1>Hey There!</h1>
                <h1>You are not authenticated to access this page. please <Link to="/sign-in" className="text-red-600 text-xl font-bold">Sign In</Link> to get Access</h1>
        </div>
        )}
        
    </div>
  )
}
export default About