import { useState } from "react";
import Header from "../header/header";
import HomeDesign from "../homePageDesign/homeDesign";
import "./screen.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { bigSavingZone, offerZone } from "../contants/constants";
import BigSavingZone from "../bigSavingZone/bigSavingZone";
import NewArrivals from "../newArrivals/newArrivals";
import ForMenTshirt from "../forMenTshirt/forMenTshirt";
import ForMenShirt from "../forMenShirt/forMenShirt";
import Footer from "../footer/footer";
import ForWomen from "../forWomen/forWomen";

const Screen = () => {
    const navigate = useNavigate();
    const [offerZoneData, setOfferZoneData] = useState(offerZone);
    const bigSavingZoneHandler = (e) => {
        e.stopPropagation();
        navigate(`/category/${e.target.id}/Men`);
    }

    return (
        <div>
            <div>
                <div className="mainBanner">
                    <div className="overflow-hidden w-fit relative ">
                        <img src="https://www.beyoung.in/api/catalog/homepage-3-10/banner-new/new/SHIRT-BANNER-DESKTOP-VIEW.jpg" alt="" />
                        <Link to={`allProducts/${"shirt"}`}><div className="block1"></div></Link>
                        <Link to={`allProducts/${"shirt"}`}><div className="block2"></div></Link>
                        <Link to={`allProducts/${"T-shirt"}`}><div className="block3"></div></Link>
                        <Link to={`allProducts/${"Printed Shirt"}`}><div className="block4"></div></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-14 mb-20 px-8 mainBox">
                    <div className="flex overflow-x-auto mt-16 offerImgBox">
                        {offerZone?.map((val) => {
                            return <img className={val.class} src={val.image} alt="offer Image" />
                        })}
                    </div>
                    <div className="flex justify-between w-full">
                        <Link to={`/category/${"T-shirt"}/Men`} className="container1"><img className=" rounded-2xl " src="https://www.beyoung.in/api/catalog/homepage-3-10/combo-home-page-banner-desktop-view-25-11.jpg" alt="" /></Link>
                        <Link to={`/category/${"Full Sleeve T-shirt"}/Men`} className="container1"><img className=" rounded-2xl " src="https://www.beyoung.in/api/catalog/homepage-3-10/banner-new/new/home-page-banner-full-sleeve-desktop-view.jpg" alt="" /></Link>

                    </div>
                    <div>
                        <BigSavingZone bigSavingZoneHandler={bigSavingZoneHandler} />
                    </div>
                    <div>
                        <NewArrivals />
                    </div>
                    <div>
                        <img src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/number-1-strip-banner/1.jpg" alt="" />
                        <img className="mt-6" src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/desktop-width/brand-icons-less-width.png" alt="" />
                    </div>
                    <div className="p-6 bestSelling">
                        <div className="flex justify-between">
                            <p className="mb-8 text-xl font-semibold pl-4 text-left bestSellingName">BEST SELLING PRODUCT</p>
                            <Link to={`allProducts/${"t-shirt"}`}><span className="text-xs cursor-pointer h-4 underline decoration-solid">View All</span></Link>
                        </div>
                        <img className="rounded-lg" src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/Combo-banner/Combo-banner.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/strip/strip.jpg" alt="" />
                    </div>
                    {/* Mens Category */}
                    <div>
                        <img className="forStrips" src="/img/forMenStrip.png" alt="" />                        
                            <ForMenTshirt />
                            <ForMenShirt/>
                    </div>
                    {/* Womens Category */}
                    <>
                        <img className="forStrips" src="/img/forWomenStrip.png" alt="" />
                        <ForWomen/>
                    </>
                    
   
                </div>
                <Footer/>
            </div>

        </div>

    )
}

export default Screen;