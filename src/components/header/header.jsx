import { useContext, useEffect, useState } from "react";
import { products } from "../contants/constants";
import MenCatagory from "../navListCatagory/menCatagory";
import "./header.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import WomenCatagory from "../navListCatagory/womenCategory";
import Login from "../loginSignup/login";
import Signup from "../loginSignup/signup";
import { AppContext } from "../../contextApi/AppContext";
import { Filter } from "interweave";
import MobileViewCategory from "../navListCatagory/mobileViewCategory";


const Header = (props) => {
    const { goToHomeHandler, loginSignup, menOnMouseOver, menOnMouseLeave, womenOnMouseOver, womenOnMouseLeave, winterOnMouseLeave, winterOnMouseOver, newOnMouseLeave, newOnMouseOver, stat, stat2, onClickHandler, categoryType, cartOpen, onMouseOverDropBox, submitData } = props;
    const [searchStatus, setSearchStatus] = useState("none");
    const [searchParam, setSearchParam] = useState("");
    const [searchFlag, setSearchFlags] = useState(false);
    const [categoryFlag, setCategoryFlag] = useState(false);
    const [cart, setCart] = useState(0);
    const navigate = useNavigate();
    const { token, logout, openLogin, openSignup, totalCart,setTotalCart } = useContext(AppContext);
    const searchFunc = () => {
        if (!searchFlag) {
            setSearchFlags(true);
            setSearchStatus("flex");
        }
        else {
            setSearchFlags(false)
            setSearchStatus("none");
        }
    }

    const cartHandler = () => {
        if (token) {
            navigate("/cart");
        } else {
            openLogin();
        }
    }

    const getCartproducts = async () => {
        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`,
                {
                    method: 'GET',
                    headers: {
                        'projectID': 'zx5u429ht9oj',
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODNkMzZlYWVjOTkyMWMyOTVmNjg4NiIsImlhdCI6MTcwMzMyMzI1NSwiZXhwIjoxNzM0ODU5MjU1fQ.JM2QH4lDuFBmTLYKEb777cSa9pBZ4SU4ytEY55sA-5o`,
                    },
                }
            );
            let jsonData = await getData.json();
            setTotalCart(jsonData.data.items.length);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            getCartproducts()
        }
        else{
            setTotalCart(0)
        }
    }, [token,totalCart])

    const isSticky = (e) => {
        const header = document.getElementById('mainHeader');
        const scrollTop = window.scrollY;
        scrollTop >= 80 ? header.classList.add('sticky') : header.classList.remove('sticky');
        const sticky = document.querySelector('.sticky');

    };

    const searchHandler = (e) => {
        setSearchParam(e.target.value);
    }

    const searchButtonHandler = () => {
        let userSearch = searchParam.split(" ");

    }
    const favoriteItems = () => {
        if (token) {
            navigate("/favoriteItems")
        }
        else {
            openLogin();
        }

    }
    const openCategory = () => {

        document.getElementById("sidebar").style.transform = "translateX(0rem)";
    }
    const closeCategory = () => {
        document.getElementById("sidebar").style.transform = "translateX(-100rem)"
    }

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    return (
        <>
            <div className=" fixed w-5 h-5 z-30 ">
                <Login />
                <Signup />

            </div>
            <header className="header1 relative">
                <section className="headerBox ">
                    {/* header 1 */}
                    <header className="navBox1 text-sm py-1.5 z-20">
                        <p>Free shipping available on all orders. Don't miss out – shop now!</p>

                    </header>
                    {/* header 2 */}
                    <section className=" bg-black z-20">
                        <header className="navBox2 flex items-center bg-black text-white justify-between py-2">
                            <nav className="flex"><img className="w-4 h-5 mr-2" src="/img/locationLogo.png" alt="" /><span className="fit-content">TRACK YOUR ORDER</span></nav>
                            <nav className="flex items-center" >
                                {!token ? <>                                    
                                    <p onClick={() => openLogin()} className="fit-content cursor-pointer mr-4">LOG IN</p><span>|</span><p onClick={() => openSignup()}className="fit-content cursor-pointer ml-4">SIGNUP</p>
                                </>
                                    : <p className="fit-content cursor-pointer ml-4 font-semibold" onClick={() => logout()}>Logout</p>}
                            </nav>
                        </header>
                    </section>
                    {/* header 3 */}
                    <section id="mainHeader">
                        <header className=" flex justify-center py-2 relative headerContainer">
                            <MobileViewCategory closeCategory={closeCategory} />
                            <div className="navBox3 flex justify-between items-center">
                                <nav className="flex relative">
                                    {/* hamburgerBox */}
                                    <section className="flex hamburgerBox">
                                        <div onClick={openCategory} className="mr-3  hamShow">
                                            <input type="checkbox" id="checkbox1" class=" checkbox1 visuallyHidden" />
                                            <label for="checkbox1">
                                                <div class="hamburger hamburger1">
                                                    <span class="bar bar1"></span>
                                                    <span class="bar bar2"></span>
                                                    <span class="bar bar3"></span>
                                                    <span class="bar bar4"></span>
                                                </div>
                                            </label>
                                        </div>
                                        <Link to="/">
                                            <img onClick={goToHomeHandler} className="cursor-pointer w-38 h-10 pr-2 pt-2 pb-2 mr-5 logo" src="/img/beyoungLogo.png" alt="" />
                                            </Link>
                                    </section>
                                    <nav className="flex text-sm font-semibold cursor-pointer navNameList">
                                        <p id="men" className=" relative hover-bg-yellow px-6 py-2 flex items-center catMen" onMouseLeave={menOnMouseLeave} onMouseOver={menOnMouseOver} >MEN <MenCatagory status={stat} clickHandler={() => { onClickHandler() }} /></p>
                                        <p className="relative hover-bg-yellow px-6 py-2 flex  items-center catWomen" onMouseLeave={womenOnMouseLeave} onMouseOver={womenOnMouseOver}>WOMEN <WomenCatagory status2={stat2} clickHandler={() => { onClickHandler() }} /></p>
                                        <p className="hover-bg-yellow px-6 py-2 flex items-center catWinter" onMouseLeave={winterOnMouseLeave} onMouseOver={winterOnMouseOver} >WINTER WEARS</p>
                                        <p className="hover-bg-yellow px-6 py-2 flex items-center catNew" onMouseLeave={newOnMouseLeave} onMouseOver={newOnMouseOver}>NEW ARRIVALS</p>
                                    </nav>
                                </nav>
                                <nav className="flex items-center">
                                    <div className="relative mr-3"><img onClick={searchFunc} className="w-4 h-4 mr-4 cursor-pointer" src="/img/searchIcon.png" alt="" />
                                        <SearchBar displaySearch={searchStatus} searchHandler={searchHandler} searchButtonHandler={searchButtonHandler} /></div>
                                    <p onClick={favoriteItems}>
                                        <img className="w-4 h-4 cursor-pointer mr-3" src="/img/love-icon.png" alt="" />
                                    </p>
                                    <p onClick={cartHandler} className="relative ml-4 cursor-pointer">
                                        <img className="w-4 h-4 cursor-pointer" src="/img/cart-icon.png" alt="" />
                                        <div className="cartCount absolute cursor-pointer"><p>{totalCart}</p></div>
                                    </p>
                                </nav>
                            </div>
                        </header>
                    </section>
                </section>
            </header>
            <Outlet />
        </>
    )
}

export default Header;
