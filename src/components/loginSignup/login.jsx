import { useContext, useEffect, useState } from "react";
import "./loginSignup.css";
import { AppContext } from "../../contextApi/AppContext";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const { displayLogin, } = props;
    const [userExistErrorMsg, setUserExistErrorMsg] = useState("none");
    const {login,setToken, loginStatus, closeHandler } = useContext(AppContext);
    const [emailErrorMsg, setEmailErrorMsg] = useState("none");
    const [passErrorMsg, setPassErrorMsg] = useState("none");
    const [user, setUser] = useState({ email: '', password: '', "appType": "ecommerce" });
    const handleChange2 = (e) => {
        if (e.target.id === "email") {
            if (e.target.value.includes("@gmail.com")) {
                setEmailErrorMsg("none");
            }
            let update = { ...user };
            update = { ...update, email: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "password") {
            if (e.target.value.length >= 4) {
                setPassErrorMsg("none")
            }
            let update = { ...user };
            update = { ...update, password: e.target.value }
            setUser(update);
        }
    }

    const postLogin = async (e) => {
        e.preventDefault();
        if(user.password.length >= 4 && user.email.includes("@gmail.com")){
            try {
                let postData = await fetch("https://academics.newtonschool.co/api/v1/user/login",
                    {
                        method: 'POST',
                        headers: { 'projectId': 'zx5u429ht9oj', "Content-Type": "application/json",},
                        body: JSON.stringify({...user}),
                    });
                    let jsonData = await postData.json();                
                    console.log("jsonData", jsonData);
                    clearForm();
                if (jsonData.status === "success") { 
                    localStorage.setItem("token", jsonData.token);
                    setToken(localStorage.getItem("token"));
                    closeHandler();
                }
                else if(jsonData.status==="fail"){
                    setUserExistErrorMsg("flex");
                }
            }
            catch (error) {
                console.log("error", error); 
            }
        }else if(!user.email.includes("@gmail.com")){
            setEmailErrorMsg("block");
        }
        else if(!user.password.length < 4){
            setPassErrorMsg("block");
        }
    }
    const closeAlreadyExistUser = (e) => {
        e.stopPropagation();
        setUserExistErrorMsg("none")
    }
    const clearForm = () => { 
        console.log("clearForm enter");
        document.getElementById("loginForm").reset();
      }

    return (
        <div style={{ display: loginStatus }} className=" absolute  loginFormOutsideBox">
            
            <div className=" bg-white relative text-left rounded-md overflow-hidden loginFormInsideBox">
            <div style={{ display: userExistErrorMsg }} className=" absolute w-full  h-full alreadyExistsBox">
                <div className="flex flex-col gap-5 bg-white py-4 px-7 rounded">
                    <p className=" font-semibold">Incorrect EmailId or Password!!!</p>
                    <button onClick={closeAlreadyExistUser} className=" rounded py-1 bg-red-600 text-white text-sm font-semibold">Close</button>
                </div>
            </div>
                <div onClick={() => closeHandler()} className=" absolute top-2 right-6 cursor-pointer text-base font-semibold">X</div>
                <img src="https://www.beyoung.in/images/login-and-signup-image.jpg" alt="" />
                <div className=" px-7 py-4">
                    <p className=" font-semibold text-2xl mb-1 px-5">Login</p>
                    <p className=" text-gray-500 text-xs px-5">Get Exciting Offers & Track Order</p>
                    <form id="loginForm" className=" flex p-3 flex-col" onSubmit={postLogin}>
                        <input onChange={handleChange2} autoComplete="on" id="email" className=" h-10 mb-2 px-3 rounded loginsignInput" type="email" placeholder="Enter your email" />
                        <span style={{ display: emailErrorMsg }} className=" text-xs ml-1 mb-1 text-red-600">Enter Correct E-mail!!!</span>
                        <input onChange={handleChange2}  id="password" className=" h-10 mb-3 px-3 rounded loginsignInput" type="password" autoComplete="current-password" placeholder="Enter your password" />
                        <span style={{ display: passErrorMsg }} className=" text-xs ml-1 mb-1 text-red-600">Enter Correct Password!!!</span>
                        <button type="submit" className=" font-semibold py-3 rounded text-white loginButton">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;