import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { AppContext } from "../contextApi/AppContext";
import Login from "../components/loginSignup/login";



// Higher order component which takes the component as a params and return the new updated component

const isAuth = (Component)=> {
 return  (props) => {
    const {token,openLogin}=useContext(AppContext);
    console.log("isAuth Token",token);
    const [isAutheticated , setIsAuthenticated] = useState(token);
    return   isAutheticated  ?  <Component {...props}/> : <Navigate to={"/Login"}/>
  }
    
}


export default isAuth;