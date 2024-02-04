import { Suspense, useState } from "react";
import Header from "../header/header";
import Screen from "../screen/screen";
import CardDetails from "../cardDetails/cardDetails";
import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFoundProduct from "../notFound/notFound";
import AppContextProvider from "../../contextApi/AppContext";
import Login from "../loginSignup/login";
import Signup from "../loginSignup/signup";
import UserAddress from "../cart/cartAddress";
import Loading from "../loading/loading";
import CartPayment from "../cart/cartPayment";
import OrderDetails from "../orders/orders";
import Upcomming from "../upcomming/upcomming";
const ShowAllProducts= React.lazy(()=> import('../showAllProducts/showAllProducts'));
const ShowNavbarProducts= React.lazy(()=> import('../showNavbarProduct/showNavbarProduct'));
const Cart= React.lazy(()=> import('../cart/cart'));
const Wishlist= React.lazy(()=> import('../wishlist/wishlist'));

const Home = () => {
    const [status, setStatus] = useState("none");
    const [status2, setStatus2] = useState("none");
    const [status3, setStatus3] = useState("none");
    const [status4, setStatus4] = useState("none");
    const [showProducts, setShowProducts] = useState("none");

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
    const winterOnMouseOver=(e)=>{
        e.stopPropagation();
        setStatus3("flex");
    }
    const categoryClose = () => {
        setStatus("none");
        setStatus2("none");
        setStatus3("none");
        setStatus4("none");
        // setCategoryType("");
    }
    const newOnMouseOver=(e)=>{
        e.stopPropagation();
        setStatus4("flex");
    }
    const showlist = () => {
        setShowProducts("flex");
        setStatus("none");
        setStatus2("none");
        setStatus3("none");
        setStatus4("none");
    }

    // Project Link: https://beyoung-store-clone-react-project-1-jnteolvro757.vercel.app/
    return (
        <AppContextProvider>
            <div className="overflow-hidden">
                <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/" element={<Header goToHomeHandler={goToHomeHandler} menOnMouseOver={menCatagoryShow} menOnMouseLeave={categoryClose} womenOnMouseOver={womenOnMouseOver} womenOnMouseLeave={categoryClose} winterOnMouseOver={winterOnMouseOver} winterOnMouseLeave={categoryClose} newOnMouseOver={newOnMouseOver} newOnMouseLeave={categoryClose} newDisplay={status4} winterDisplay={status3} stat={status} stat2={status2} onClickHandler={showlist} />} >
                        <Route index element={<Screen />} />
                        <Route path="product-details/:id" element={<CardDetails />} />
                        <Route path="category/:id/:gender" element={<ShowNavbarProducts />} />
                        <Route path="allProducts/:id" element={<ShowAllProducts />} />
                        <Route path="wishlist" element={<Wishlist/>} />
                        <Route path="orders" element={<OrderDetails/>} />
                        <Route path="login" element={<Login/>} />
                        <Route path="signup" element={<Signup/>} />
                        <Route path="upcomming" element={<Upcomming/>} />
                        <Route path="*" element={<NotFoundProduct />} />
                    </Route>

                    <Route path="cart" element={<Cart />} />
                    <Route path="address" element={<UserAddress/>} />
                    <Route path="payment" element={<CartPayment/>} />
                </Routes>
                </Suspense>
            </div>
        </AppContextProvider>

    )
}

export default Home;

// 1234 