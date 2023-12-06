import { useState } from "react";
import Header from "../header/header";
import HomeDesign from "../homePageDesign/homeDesign";
import "./screen.css";
import { Link } from "react-router-dom";
import { bigSavingZone } from "../contants/constants";
import BigSavingZone from "../bigSavingZone/bigSavingZone";

const Screen=()=>{
    
    return(
        <div>
            <div>
                <div className="mb-16 relative">
                    <img src="https://www.beyoung.in/api/catalog/homepage-3-10/banner-new/new/SHIRT-BANNER-DESKTOP-VIEW.jpg" alt="" />
                    <Link to="shirts"><div className="block1"></div></Link>
                    <Link to="regular-shirts"><div className="block2"></div></Link>
                    <Link to="limited-edition"><div className="block3"></div></Link>
                    <Link to="shirts-combos"><div className="block4"></div></Link>
                </div>
                <div className="px-44 flex flex-col gap-14 mb-20 mainBox">
                    <div className="flex overflow-x-auto offerImgBox">
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/1-new.png" alt="" />
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/2-new.png" alt="" />
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/3-new.png" alt="" />
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/4-new.png" alt="" />
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/5-new.png" alt="" />
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/6-new.png" alt="" />
                        <img className="offerImg" src="https://www.beyoung.in/api/catalog/homepage-3-10/Offers-strip/desktop/7-new.png" alt="" />
                    </div>
                    <div className="flex justify-between">
                        <img className="container1" src="https://www.beyoung.in/api/catalog/homepage-3-10/combo-home-page-banner-desktop-view-25-11.jpg" alt="" />
                        <img className="container1" src="https://www.beyoung.in/api/catalog/homepage-3-10/banner-new/new/home-page-banner-full-sleeve-desktop-view.jpg" alt="" />
                    </div>
                    <div>
                        <BigSavingZone/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Screen;