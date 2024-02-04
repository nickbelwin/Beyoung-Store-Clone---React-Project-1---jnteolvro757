import { useContext, useEffect, useState } from "react";
import "./loginSignup.css";
import { AppContext } from "../../contextApi/AppContext";

const Signup = (props) => {
    const { displaySignup } = props;
    const [dis, setDis] = useState(displaySignup);
    const [user, setUser] = useState({ name: "", email: '', password: '', "appType": "ecommerce" });
    const [nameErrorMsg, setNameErrorMsg] = useState("none");
    const [emailErrorMsg, setEmailErrorMsg] = useState("none");
    const [passErrorMsg, setPassErrorMsg] = useState("none");
    const [userExistErrorMsg, setUserExistErrorMsg] = useState("none");
    const { userToken, signupStatus, setToken, closeHandler,setNameOfUser } = useContext(AppContext);
    const handleChange = (e) => {
        if (e.target.id === "username") {
            if (e.target.value.length >= 1) {
                setNameErrorMsg("none")
            }
            let update = { ...user };
            update = { ...update, name: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "email") {
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
        // console.log("setUserInfo", user);
    }
    console.log("setUserInfo", user);

    const postSignup = async (e) => {
        e.preventDefault();
        if (user.password.length >= 4 && user.name.length >= 1 && user.email.includes("@gmail.com")) {
            try {
                let postData = await fetch("https://academics.newtonschool.co/api/v1/user/signup",
                    {
                        method: 'POST',
                        headers: { 'projectId': 'zx5u429ht9oj', "Content-Type": "application/json", },
                        body: JSON.stringify({ ...user }),

                    });
                let jsonData = await postData.json();
                console.log("jsonData.tokan", jsonData);
                // document.getElementById("username").value = "";
                // document.getElementById("email").value = "";
                // document.getElementById("password").value = "";
                clearForm();

                if (jsonData.status === "success") {
                    localStorage.setItem("token", jsonData.token);
                    localStorage.setItem("name", jsonData.data.user.name);
                    setNameOfUser(localStorage.getItem("name"));
                    setToken(localStorage.getItem("token"));
                    setUser({ name: "", email: '', password: '', "appType": "ecommerce" })

                    closeHandler();
                } else if (jsonData.status === "fail") {
                    setUserExistErrorMsg("flex");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        } else if (!user.name.length >= 1) {
            setNameErrorMsg("block");
        }
        if (!user.email.includes("@gmail.com")) {
            setEmailErrorMsg("block");
        }
        if (!user.password.length < 4) {
            setPassErrorMsg("block");
        }

    }
    const closeAlreadyExistUser = (e) => {
        e.stopPropagation();
        setUserExistErrorMsg("none")
    }
    const clearForm = () => { 
        console.log("clearForm enter");
        document.getElementById("signupForm").reset();
      }
    useEffect(() => {

    })
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
                <div style={{ display: userExistErrorMsg }} className=" absolute w-full  h-full alreadyExistsBox">
                    <div className="flex flex-col gap-5 bg-white py-4 px-7 rounded">
                        <p className=" font-semibold">User Already Exists!!!</p>
                        <button onClick={closeAlreadyExistUser} className=" rounded py-1 bg-red-600 text-white text-sm font-semibold">Close</button>
                    </div>
                </div>
                <div onClick={() => closeHandler()} className=" absolute top-2 right-6 cursor-pointer text-base font-semibold">X</div>
                <img src="https://www.beyoung.in/images/login-and-signup-image.jpg" alt="" />
                <div className=" px-7 py-4">
                    <p className=" font-semibold text-2xl mb-1 px-5">Signup</p>
                    <p className=" text-gray-500 text-xs px-5">Get Exciting Offers & Track Order</p>
                    <form id="signupForm" className=" flex p-3 flex-col" onSubmit={postSignup}>
                        <input id="username" onChange={handleChange} className=" h-10 mb-2 px-3 rounded loginsignInput" autoComplete="on" type="text" placeholder="Enter your name" />
                        <span style={{ display: nameErrorMsg }} className=" text-xs ml-1 mb-1 text-red-600">Please Enter Your Name!!!</span>
                        <input id="email" onChange={handleChange} className=" h-10 mb-2 px-3 rounded loginsignInput" autoComplete="on" type="email" placeholder="Enter your email" />
                        <span style={{ display: emailErrorMsg }} className=" text-xs ml-1 mb-1 text-red-600">Enter Correct E-mail!!!</span>
                        <input id="password" onChange={handleChange} className=" h-10  px-3 mb-2 rounded loginsignInput" autoComplete="current-password" type="password" placeholder="Enter your password" />
                        <span style={{ display: passErrorMsg }} className=" text-xs ml-1 mb-1 text-red-600">minimum 4 character required for password!!!</span>
                        <button type="submit" className=" font-semibold py-3 rounded text-white loginButton">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;