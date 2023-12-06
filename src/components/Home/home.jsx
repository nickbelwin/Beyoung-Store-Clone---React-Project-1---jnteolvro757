import { useState } from "react";
import Header from "../header/header";
import HomeDesign from "../homePageDesign/homeDesign";
import Screen from "../screen/screen";
import CardDetails from "../cardDetails/cardDetails";
import { Route, Routes } from "react-router-dom";

const Home=()=>{
    const[status, setStatus]=useState("none")
    const [showProducts,setShowProducts]=useState("none");
    const [loader, setLoader]=useState(false);
    const goToHomeHandler=()=>{
        setShowProducts("none");
    }
    const menCatagoryShow=()=>{
        setStatus("flex");
    }
    const catagoryClose=()=>{
        setStatus("none");
    }
    const showlist=()=>{
        setLoader(true);
        setShowProducts("flex");
        setStatus("none");
        setLoader(false);
    }
    return(
        <div>
            <Header
            goToHomeHandler={goToHomeHandler}
            menOnMouseOver={menCatagoryShow}
            menOnMouseLeave={catagoryClose}
            stat={status}
            onClickHandler={showlist}
            />
            <Routes>
                <Route path="/" element={<Screen/>} />
                <Route path="menproducts" element={<HomeDesign/>}/>
                <Route path="regular-shirts" element={<HomeDesign/>} />
                <Route path="limited-edition" element={<HomeDesign/>} />
                <Route path="shirts-combos" element={<HomeDesign/>} />
                <Route ihdex path="shirts" element={<HomeDesign/>} />
                <Route path="product-details/:id" element={<CardDetails/>} />
                {/* </Route> */}
                
            </Routes>
        </div>

    )
}

export default Home;