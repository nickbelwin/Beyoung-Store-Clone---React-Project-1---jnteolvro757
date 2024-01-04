import { useContext, useEffect, useState } from "react";
import "./loginSignup.css";
import { AppContext } from "../../contextApi/AppContext";

const Signup = (props) => {
    const { displaySignup } = props;
    const [dis, setDis] = useState(displaySignup);
    const [user, setUser] = useState({ name: "", email: '', password: '', "appType": "ecommerce" });
    const { userToken, signupStatus, setToken, closeHandler } = useContext(AppContext);
    const handleChange = (e) => {
        if (e.target.id === "username") {
            let update = { ...user };
            update = { ...update, name: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "email") {
            let update = { ...user };
            update = { ...update, email: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "password") {
            let update = { ...user };
            update = { ...update, password: e.target.value }
            setUser(update);
        }
        // console.log("setUserInfo", user);
    }
    console.log("setUserInfo", user);

    const postSignup = async (e) => {
        e.preventDefault();
        if(user.password.length >= 4 && user.name.length >= 1){
            try {
                let postData = await fetch("https://academics.newtonschool.co/api/v1/user/signup",
                    {
                        method: 'POST',
                        headers: { 'projectId': 'zx5u429ht9oj', "Content-Type": "application/json", },
                        body: JSON.stringify({ ...user }),
    
                    });
                    let jsonData = await postData.json();
                    console.log("jsonData.tokan", jsonData.token);
                    setToken(jsonData.token);
                    closeHandler();
            } catch (error) {
                console.log("Error:",error)
            }
        }else if(!user.name.length >= 1){
            alert("Enter Name");
            
        }else{
            alert("minimum 4 character required for password");
        }
    }
    // const openSignup=()=>{
    //     setDis(displaySignup);
    // }
    // const signupCloseHandler=()=>{
    //     setDis("none");
    // }
    // useEffect(()=>{
    //     openSignup();
    // },[displaySignup])
    return (
        <div style={{ display: signupStatus }} className=" absolute  loginFormOutsideBox">
            <div className=" bg-white relative text-left rounded-md overflow-hidden loginFormInsideBox">
                <div onClick={() => closeHandler()} className=" absolute top-2 right-6 cursor-pointer text-base font-semibold">X</div>
                <img src="https://www.beyoung.in/images/login-and-signup-image.jpg" alt="" />
                <div className=" px-7 py-4">
                    <p className=" font-semibold text-2xl mb-1 px-5">Signup</p>
                    <p className=" text-gray-500 text-xs px-5">Get Exciting Offers & Track Order</p>
                    <form className=" flex p-3 flex-col" onSubmit={postSignup}>
                        <input id="username" onChange={handleChange} className=" h-10 mb-2 px-3 rounded loginsignInput" autoComplete="off" type="text" placeholder="Enter your name" />
                        <input id="email" onChange={handleChange} className=" h-10 mb-2 px-3 rounded loginsignInput" autoComplete="off" type="email" placeholder="Enter your email" />
                        <input id="password" onChange={handleChange} className=" h-10 mb-3 px-3 rounded loginsignInput" autoComplete="current-password" type="password" placeholder="Enter your password" />
                        <button type="submit" className=" font-semibold py-3 rounded text-white loginButton">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;