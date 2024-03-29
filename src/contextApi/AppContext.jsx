import { createContext, useEffect, useReducer, useState } from "react"
import { Navigate } from "react-router-dom";



export const AppContext = createContext();


const AppContextProvider = ({children})=>{

    const [token, setToken]=useState();
    const [loginStatus, setLoginStatus] = useState("none");
    const [signupStatus, setSignupStatus] = useState("none");
    const [totalCart, setTotalCart]= useState(0);
    const [totalWishlist, setTotalWishlist]=useState(0);
    const [isAdded, setIsAdded]= useState(false);
    const [wishlistProducts, setWishlistProducts]=useState([]);
    const [userAddress, setUserAddresss]= useState([]);
    const [nameOfUser, setNameOfUser]=useState("");
    
    // for logout
    const logout=()=>{     
        localStorage.removeItem("token");
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
    useEffect(()=>{
        setToken(localStorage.getItem("token"));
        setNameOfUser(localStorage.getItem("name"));
    },[]);
    return (
        <AppContext.Provider value= {{openLogin,openSignup,logout,closeHandler,token,setToken,totalCart,setTotalCart,totalWishlist, setTotalWishlist,isAdded,setIsAdded,wishlistProducts, setWishlistProducts,userAddress, setUserAddresss,loginStatus,signupStatus,nameOfUser, setNameOfUser}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;