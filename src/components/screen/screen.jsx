import { Suspense } from "react";
import "./screen.css";
import { Link, useNavigate } from "react-router-dom";
import { mobileBannerCategory, mobileCategory, offerZone } from "../contants/constants";
import ForMenShirt from "../forMenShirt/forMenShirt";
import Footer from "../footer/footer";
import ForWomen from "../forWomen/forWomen";
import React from "react";
import Loading from "../loading/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
const BigSavingZone = React.lazy(() => import('../bigSavingZone/bigSavingZone'));
const NewArrivals = React.lazy(() => import('../newArrivals/newArrivals'));
const ForMenTshirt = React.lazy(() => import('../forMenTshirt/forMenTshirt'));

const Screen = () => {
    const navigate = useNavigate();
    const bigSavingZoneHandler = (e) => {
        e.stopPropagation();
        navigate(`/category/${e.target.id}/Men`);
    }
    return (
        <>
            <Suspense fallback={<Loading />}>
                <>
                    <div className="flex justify-between overflow-x-scroll showOnMob">
                        {mobileCategory?.map((val) => {
                            return <Link to={`/category/${val.link}/Men`}><div className="mobileCatImg p-2 mr-1"><LazyLoadImage className="" src={val.img} placeholderSrc="https://www.beyoung.in/beyoung-loader.gif" /></div></Link>
                        })}
                    </div>
                    <div className="mainBanner">
                        <div className=" relative showOnMob">
                            <Link to="/category/Oversized T-shirt/Men"><img src="https://www.beyoung.in/api/catalog/new-year/home/new-year-sale-banner-mobile-view.jpg" alt="" /></Link>
                            <div className=" absolute bottom-0 ml-1 overflow-x-scroll ">
                                <div className="flex justify-between ">
                                {mobileBannerCategory?.map((val) => {
                                    return <Link to={`/category/${val.link}/Men`}><div className="mobileBannerImg p-2"><LazyLoadImage className=" rounded-md" src={val.img} placeholderSrc="https://www.beyoung.in/beyoung-loader.gif" /></div></Link>
                                })}
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden w-fit relative mainBannerImageBox">
                            <img className="mainBannerImage" src="https://www.beyoung.in/api/catalog/homepage-3-10/banner-new/new/SHIRT-BANNER-DESKTOP-VIEW.jpg" alt="" />
                            <Link to={`/category/Oversized shirt/Men`}><div className="block1"></div></Link>
                            <Link to={`/category/Printed shirt/Men`}><div className="block2"></div></Link>
                            <Link to={`/category/shirt/Men`}><div className="block3"></div></Link>
                            <Link to={`/upcomming`}><div className="block4"></div></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 mb-20  mainBox">
                        <div className="flex overflow-x-auto mt-8 offerImgBox">
                            {offerZone?.map((val) => {
                                return <img className={val.class} src={val.image} alt="offer Image" />
                            })}
                        </div>
                        <div className="flex justify-between w-full container1Box">
                            <Link to={`/upcomming`} ><div className="container1"><img className=" rounded-2xl " loading="lazy" src="https://www.beyoung.in/api/catalog/homepage-3-10/combo-home-page-banner-desktop-view-25-11.jpg" alt="" /></div></Link>
                            <Link to={`/category/${"Full Sleeve T-shirt"}/Men`} className="container1"><div className="container1"><img className=" rounded-2xl " loading="lazy" src="https://www.beyoung.in/api/catalog/homepage-3-10/banner-new/new/home-page-banner-full-sleeve-desktop-view.jpg" alt="" /></div></Link>

                        </div>
                        <>
                            <BigSavingZone bigSavingZoneHandler={bigSavingZoneHandler} />
                        </>
                        <>
                            <NewArrivals />
                        </>
                        <>
                            <img src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/number-1-strip-banner/1.jpg" alt="" />
                            <img className="mt-6" src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/desktop-width/brand-icons-less-width.png" alt="" />
                        </>
                        <div className="p-6 bestSelling">
                            <div className="flex justify-between">
                                <p className="mb-8 text-xl font-semibold pl-4 text-left bestSellingName">BEST SELLING PRODUCT</p>
                                <Link to={`allProducts/${"t-shirt"}`}><span className="text-xs cursor-pointer h-4 underline decoration-solid">View All</span></Link>
                            </div>
                            <img className="rounded-lg" src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/Combo-banner/Combo-banner.jpg" alt="" />
                        </div>
                        <>
                            <img src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/strip/strip.jpg" alt="" />
                        </>
                        {/* Mens Category */}
                        <>
                            <img className="forStrips" src="/img/forMenStrip.png" alt="" />
                            <ForMenTshirt />
                            <ForMenShirt />
                        </>
                        {/* Womens Category */}
                        <>
                            <img className="forStrips" src="/img/forWomenStrip.png" alt="" />
                            <ForWomen />
                        </>


                    </div>
                    <Footer />
                </>
            </Suspense>

        </>

    )
}

export default Screen;