import { useState } from "react";
import Header from "../header/header";
import HomeDesign from "../homePageDesign/homeDesign";
import Screen from "../screen/screen";
import CardDetails from "../cardDetails/cardDetails";
import { Route, Routes } from "react-router-dom";
import ShowAllProducts from "../showAllProducts/showAllProducts";
import Cart from "../cart/cart";
import ShowNavbarProducts from "../showNavbarProduct/showNavbarProduct";

import NotFoundProduct from "../../notFound/notFound";
import AppContextProvider from "../../contextApi/AppContext";
import Favorites from "../../favorites/favorites";
import Login from "../loginSignup/login";
import Signup from "../loginSignup/signup";



const Home = () => {
    const [status, setStatus] = useState("none");
    const [status2, setStatus2] = useState("none");
    const [loginSignup, setLoginSignup] = useState();
    const [categoryType, setCategoryType] = useState("");
    const [showProducts, setShowProducts] = useState("none");
    const [loader, setLoader] = useState(false);
    const [submitFormData, setSubmitFormData] = useState();

    const goToHomeHandler = () => {
        setShowProducts("none");
    }
    const menCatagoryShow = (e) => {
        e.stopPropagation();
        setStatus("flex");
        // document.getElementById("men").classList.add("backColor");
        // setCategoryType("men");
    }
    const womenOnMouseOver = (e) => {
        e.stopPropagation();
        setStatus2("flex");
        // document.getElementById("men").classList.remove("backColor");
        // setCategoryType("women");
    }
    const categoryClose = () => {
        setStatus("none");
        setStatus2("none");
        // setCategoryType("");
    }
    const showlist = () => {
        setShowProducts("flex");
        setStatus("none");
        setStatus2("none");
    }

    const submitData = () => {

    }

    return (
        <AppContextProvider>
            <div className="overflow-hidden">
                <Routes>
                    <Route path="/" element={<Header goToHomeHandler={goToHomeHandler} menOnMouseOver={menCatagoryShow} menOnMouseLeave={categoryClose} womenOnMouseOver={womenOnMouseOver} womenOnMouseLeave={categoryClose} stat={status} stat2={status2} onClickHandler={showlist} submitData={submitData} />} >
                        <Route index element={<Screen />} />
                        <Route path="product-details/:id" element={<CardDetails />} />
                        <Route path="category/:id/:gender" element={<ShowNavbarProducts />} />
                        <Route path="allProducts/:id" element={<ShowAllProducts />} />
                        <Route path="favoriteItems" element={<Favorites/>} />
                        <Route path="login" element={<Login/>} />
                        <Route path="signup" element={<Signup/>} />
                        <Route path="*" element={<NotFoundProduct />} />
                    </Route>

                    <Route path="cart" element={<Cart />} />
                </Routes>
            </div>
        </AppContextProvider>

    )
}

export default Home;