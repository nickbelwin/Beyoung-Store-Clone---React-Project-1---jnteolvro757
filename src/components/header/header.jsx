import { useState } from "react";
import { products } from "../contants/constants";
import MenCatagory from "../navListCatagory/menCatagory";
import "./header.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";

const Header=(props)=>{
    const {goToHomeHandler,menOnMouseOver,menOnMouseLeave,womenOnMouseOver,womenOnMouseLeave,winterOnMouseLeave,winterOnMouseOver,newOnMouseLeave,newOnMouseOver, stat,onClickHandler}= props;
    const [searchStatus, setSearchStatus]=useState("none");
    const [searchFlag, setSearchFlags]=useState(false);
    const searchFunc=()=>{
        if(!searchFlag){
            setSearchFlags(true);
            setSearchStatus("flex");
        }
        else{
            setSearchFlags(false)
            setSearchStatus("none");
        }
    }



    
    return(
        <header className="header1">
            <div className="headerBox">
                <div className="navBox1 text-sm py-1.5"><p>Free Shipping on All Orders | Get Flat <span className="font-bold">₹150</span> OFF on Spent of ₹1499 Use Code: <span className="font-bold">BB150</span></p></div>
                <div className=" bg-black ">
                    <div className="navBox2 flex items-center bg-black text-white justify-between py-2">
                    <nav className="flex"><img className="w-4 h-5 mr-2" src="./img/locationLogo.png" alt="" /><span className="fit-content">TRACK YOUR ORDER</span></nav>
                    <nav className="flex items-center"><a href="#" className="fit-content mr-4">LOG IN</a><span>|</span><a href="#" className="fit-content ml-4">SIGNUP</a></nav>
                    </div>
                </div>
                <div className=" flex justify-center py-3.5 header">
                    <div className="navBox3 flex justify-between items-center">
                        <nav className="flex relative">
                            <Link to="/"><img onClick={goToHomeHandler} className="cursor-pointer w-38 h-10 pr-2 pt-2 pb-2" src="./img/beyoungLogo.png" alt="" /></Link>
                            <nav className="flex text-sm font-semibold cursor-pointer navNameList">
                                <p className="hover-bg-yellow px-6 py-2 flex items-center" onMouseLeave={menOnMouseLeave} onMouseOver={menOnMouseOver}>MEN <MenCatagory status={stat} clickHandler={()=>{onClickHandler()}} /></p>
                                <p className="hover-bg-yellow px-6 py-2 flex items-center" onMouseLeave={womenOnMouseLeave} onMouseOver={womenOnMouseOver}>WOMEN</p>
                                <p className="hover-bg-yellow px-6 py-2 flex items-center">COMBOS</p>
                                <p className="hover-bg-yellow px-6 py-2 flex items-center">BB KE FAVORITES</p>
                                <p className="hover-bg-yellow px-6 py-2 flex items-center" onMouseLeave={winterOnMouseLeave} onMouseOver={winterOnMouseOver}>WINTER WEARS</p>
                                <p className="hover-bg-yellow px-6 py-2 flex items-center" onMouseLeave={newOnMouseLeave} onMouseOver={newOnMouseOver}>NEW ARRIVALS</p>
                            </nav>
                        </nav>
                        <nav className="flex items-center">
                            
                            <div className="relative"><img onClick={searchFunc} className="w-4 h-4 mr-4 cursor-pointer" src="./img/searchIcon.png" alt="" />
                            <SearchBar displaySearch={searchStatus}/></div>
                            <img className="w-4 h-4 cursor-pointer" src="./img/love-icon.png" alt="" />
                            <div className="relative ml-4 cursor-pointer">
                                <img className="w-4 h-4 cursor-pointer" src="./img/cart-icon.png" alt="" />
                                <div className="cartCount absolute cursor-pointer"><p>0</p></div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
