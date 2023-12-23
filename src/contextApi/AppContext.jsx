import { createContext, useEffect, useReducer, useState } from "react"
import { Navigate } from "react-router-dom";



export const AppContext = createContext();


const AppContextProvider = ({children})=>{

    const [token, setToken]=useState();
    const [loginStatus, setLoginStatus] = useState("none");
    const [signupStatus, setSignupStatus] = useState("none");
    const [totalCart, setTotalCart]= useState(0);
    
    // for logout
    const logout=()=>{     
        setToken("");
    }
    // for display login modal
    const openLogin = () => {
        setLoginStatus("flex");
        setSignupStatus("none");
    }
    // for display signup modal
    const openSignup = () => {
        setLoginStatus("none");
        setSignupStatus("flex");
    }
    // for close login and signup modal
    const closeHandler=()=>{
        setSignupStatus("none");
        setLoginStatus("none");
    }
    
    return (
        <AppContext.Provider value= {{openLogin,openSignup,logout,closeHandler,token,setToken,totalCart, setTotalCart,loginStatus,signupStatus}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;