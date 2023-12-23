import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { AppContext } from "../contextApi/AppContext";
import Login from "../components/loginSignup/login";

const isAuth = (Component)=> {
 return  (props) => {
    const {token}=useContext(AppContext);
    console.log("isAuth Token",token);
    useEffect(()=>{
      if(token){
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
      }
    },[token])
    const [isAutheticated , setIsAuthenticated] = useState(token);
    return   isAutheticated  ?  <Component {...props}/> : "";
  }
    
}


export default isAuth;