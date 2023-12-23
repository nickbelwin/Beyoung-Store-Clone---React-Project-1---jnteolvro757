import { createContext, useEffect, useReducer, useState } from "react"



export const AppContext = createContext();


const AppContextProvider = ({children})=>{
    const [isLogin, setIsLogin]=useState(false);
    const [token, setToken]=useState();
    const [isLogout, setIsLogout]=useState(false);
    const [loginStatus, setLoginStatus] = useState("none");
    const [signupStatus, setSignupStatus] = useState("none");
    
    const login=()=>{
        setIsLogin(true);
        setIsLogout(true);
        console.log("user loged in");
    }
    const userToken=(getToken)=>{
        setToken(getToken);
        console.log("tokanget at AppContext: ",getToken);
    }
    console.log("tokanget",token);
    const logout=()=>{
        setIsLogin(false);
        setIsLogout(false);
        setToken("");
    }
    const openLogin = () => {
        setLoginStatus("flex");
        setSignupStatus("none");
    }
    const openSignup = () => {
        setLoginStatus("none");
        setSignupStatus("flex");
    }
    const closeHandler=()=>{
        setSignupStatus("none");
        setLoginStatus("none");
    }
    useEffect(()=>{

    })
    
    return (
        <AppContext.Provider value= {{login,userToken,openLogin,openSignup,logout,closeHandler,isLogout,token,loginStatus,signupStatus}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;