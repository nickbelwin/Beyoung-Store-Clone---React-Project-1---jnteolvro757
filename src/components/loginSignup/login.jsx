import { useContext, useEffect, useState } from "react";
import "./loginSignup.css";
import { AppContext } from "../../contextApi/AppContext";

const Login = (props) => {
    const { displayLogin, } = props;
    // const [dis, setDis]=useState(displayLogin);
    const {login, userToken, loginStatus, closeHandler } = useContext(AppContext);
    const [user, setUser] = useState({ email: '', password: '', "appType": "ecommerce" })
    const handleChange2 = (e) => {
        if (e.target.id === "username") {
            let update = { ...user };
            update = { ...update, email: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "password") {
            let update = { ...user };
            update = { ...update, password: e.target.value }
            setUser(update);
        }
    }

    const postLogin = async () => {
        try {
            let postData = await fetch("https://academics.newtonschool.co/api/v1/user/login",
                {
                    method: 'POST',
                    headers: { 'projectId': 'zx5u429ht9oj', "Content-Type": "application/json",},
                    body: JSON.stringify({...user}),
                });
            if (postData.ok) {
                let jsonData = await postData.json();
                
                console.log("jsonData", jsonData);
                userToken(jsonData.token);
                login();
                closeHandler();
                navigate('/')
            }

            // navigate('/')
        }
        catch (error) {
            console.log("error", error);
        }

    }
    // const openlogin=()=>{
    //     setDis(displayLogin);
    // }
    // const loginCloseHandler=()=>{
    //     setDis("none");
    // }
    // useEffect(()=>{
    //     openlogin();
    // },[displayLogin])

    return (
        <div style={{ display: loginStatus }} className=" absolute  loginFormOutsideBox">
            <div className=" bg-white relative text-left rounded-md overflow-hidden loginFormInsideBox">
                <div onClick={() => closeHandler()} className=" absolute top-2 right-6 cursor-pointer text-base font-semibold">X</div>
                <img src="https://www.beyoung.in/images/login-and-signup-image.jpg" alt="" />
                <div className=" px-7 py-4">
                    <p className=" font-semibold text-2xl mb-1 px-5">Login</p>
                    <p className=" text-gray-500 text-xs px-5">Get Exciting Offers & Track Order</p>
                    <form className=" flex p-3 flex-col" onSubmit={postLogin}>
                        <input onChange={handleChange2} autoComplete="" id="username" className=" h-10 mb-2 px-3 rounded loginsignInput" type="email" placeholder="Enter your email" />
                        <input onChange={handleChange2} id="password" className=" h-10 mb-3 px-3 rounded loginsignInput" type="password" placeholder="Enter your password" />
                        <button type="submit" className=" font-semibold py-3 rounded text-white loginButton">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;