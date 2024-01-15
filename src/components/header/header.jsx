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
    const { goToHomeHandler, loginSignup, menOnMouseOver, menOnMouseLeave, womenOnMouseOver, womenOnMouseLeave, winterOnMouseLeave, winterOnMouseOver, winterDisplay, newDisplay, newOnMouseLeave, newOnMouseOver, stat, stat2, onClickHandler, categoryType, cartOpen, onMouseOverDropBox, submitData } = props;
    const [searchStatus, setSearchStatus] = useState("none");
    const [searchParam, setSearchParam] = useState("");
    const [searchFlag, setSearchFlags] = useState(false);
    const [searchAll, setSearchAll] = useState(false);
    const [cart, setCart] = useState(0);
    const [searchLink, setSearchLink] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();
    const { token, logout, openLogin, openSignup, totalCart,setTotalCart,isAdded,setIsAdded,  } = useContext(AppContext);
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
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            let jsonData = await getData.json();
            console.log("length",jsonData.data.items.length)
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
        else {
            setTotalCart(0)
        }
    }, [token, totalCart])

    const isSticky = (e) => {
        const header = document.getElementById('mainHeader');
        const scrollTop = window.scrollY;
        scrollTop >= 80 ? header.classList.add('sticky') : header.classList.remove('sticky');
        const sticky = document.querySelector('.sticky');

    };

    const searchHandler = (e) => {
        let words = e.target.value;
        setSearchParam(words);
        words = words.toLowerCase();
        console.log(words);
        let userSearch = words.split(" ");
        console.log(userSearch);
        if (userSearch.includes("men")) {
            setSearchAll(false);
            setGender("Men");
            if (userSearch.includes("tshirt") || userSearch.includes("tshirts")) {
                setSearchLink("T-shirt");
            } else if (userSearch.includes("trouser")||userSearch.includes("trousers")) {
                setSearchLink("Trouser");
            } else if (userSearch.includes("tracksuit")||userSearch.includes("tracksuits")) {
                setSearchLink("Tracksuit");
            } else if (userSearch.includes("sweater")||userSearch.includes("sweaters")) {
                setSearchLink("sweater");
            } else if (userSearch.includes("short")||userSearch.includes("shorts")) {
                setSearchLink("short");
            }
            else if (userSearch.includes("shirt")|| userSearch.includes("shirts")) {
                setSearchLink("shirt");
            }
            else if (userSearch.includes("pyjama")||userSearch.includes("pyjamas")) {
                setSearchLink("pyjama");
            }
            else if (userSearch.includes("kurti")||userSearch.includes("kurtis")) {
                setSearchLink("kurti");
            }
            else if (userSearch.includes("kurta")||userSearch.includes("kurtas")) {
                setSearchLink("kurta");
            } else if (userSearch.includes("jumpsuit")||userSearch.includes("jumpsuits")) {
                setSearchLink("jumpsuit");
            } else if (userSearch.includes("jogger")||userSearch.includes("joggers")) {
                setSearchLink("jogger");
            } else if (userSearch.includes("jeans")) {
                setSearchLink("jeans");
            } else if (userSearch.includes("hoodie")||userSearch.includes("hoodies")){
                setSearchLink("hoodie");
            }
        } else if (userSearch.includes("women")) {
            setSearchAll(false);
            setGender("Women");
            if (userSearch.includes("tshirt") || userSearch.includes("tshirts")) {
                setSearchLink("T-shirt");
            } else if (userSearch.includes("trouser")||userSearch.includes("trousers")) {
                setSearchLink("Trouser");
            } else if (userSearch.includes("tracksuit")||userSearch.includes("tracksuits")) {
                setSearchLink("Tracksuit");
            } else if (userSearch.includes("sweater")||userSearch.includes("sweaters")) {
                setSearchLink("sweater");
            } else if (userSearch.includes("short")||userSearch.includes("shorts")) {
                setSearchLink("short");
            }
            else if (userSearch.includes("shirt")|| userSearch.includes("shirts")) {
                setSearchLink("shirt");
            }
            else if (userSearch.includes("pyjama")||userSearch.includes("pyjamas")) {
                setSearchLink("pyjama");
            }
            else if (userSearch.includes("kurti")||userSearch.includes("kurtis")) {
                setSearchLink("kurti");
            }
            else if (userSearch.includes("kurta")||userSearch.includes("kurtas")) {
                setSearchLink("kurta");
            } else if (userSearch.includes("jumpsuit")||userSearch.includes("jumpsuits")) {
                setSearchLink("jumpsuit");
            } else if (userSearch.includes("jogger")||userSearch.includes("joggers")) {
                setSearchLink("jogger");
            } else if (userSearch.includes("jeans")) {
                setSearchLink("jeans");
            } else if (userSearch.includes("hoodie")||userSearch.includes("hoodies")){
                setSearchLink("hoodie");
            }
        } else {
            setSearchAll(true);
            setGender("");
            if (userSearch.includes("tshirt") || userSearch.includes("tshirts")) {
                setSearchLink("T-shirt");
            } else if (userSearch.includes("trouser")||userSearch.includes("trousers")) {
                setSearchLink("Trouser");
            } else if (userSearch.includes("tracksuit")||userSearch.includes("tracksuits")) {
                setSearchLink("Tracksuit");
            } else if (userSearch.includes("sweater")||userSearch.includes("sweaters")) {
                setSearchLink("sweater");
            } else if (userSearch.includes("short")||userSearch.includes("shorts")) {
                setSearchLink("short");
            }
            else if (userSearch.includes("shirt")|| userSearch.includes("shirts")) {
                setSearchLink("shirt");
            }
            else if (userSearch.includes("pyjama")||userSearch.includes("pyjamas")) {
                setSearchLink("pyjama");
            }
            else if (userSearch.includes("kurti")||userSearch.includes("kurtis")) {
                setSearchLink("kurti");
            }
            else if (userSearch.includes("kurta")||userSearch.includes("kurtas")) {
                setSearchLink("kurta");
            } else if (userSearch.includes("jumpsuit")||userSearch.includes("jumpsuits")) {
                setSearchLink("jumpsuit");
            } else if (userSearch.includes("jogger")||userSearch.includes("joggers")) {
                setSearchLink("jogger");
            } else if (userSearch.includes("jeans")) {
                setSearchLink("jeans");
            } else if (userSearch.includes("hoodie")||userSearch.includes("hoodies")){
                setSearchLink("hoodie");
            }
        }

    }
    const searchButtonHandler = (e) => {
        e.stopPropagation();
        if (searchParam) {
            setSearchFlags(false)
            setSearchStatus("none");
            document.getElementById("searchBarInput").value="";
            searchProducts();
            setSearchLink("");
        }


    }
    const searchProducts = () => {
        if (searchAll) {
            navigate(`allProducts/${searchLink}`);
        } else {
            navigate(`/category/${searchLink}/${gender}`);
        }
    }
    const ordersFunc=()=>{
        if (token) {
            navigate("/orders")
        }
        else {
            openLogin();
        }
    }
    const favoriteItems = () => {
        if (token) {
            navigate("/wishlist")
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

    useEffect(()=>{
        if(isAdded){
            document.getElementById("productAddedToCart").style.transform="scale(1)"
            setTimeout(()=>{
                setIsAdded(false);
                document.getElementById("productAddedToCart").style.transform="scale(0)";
            },2000);
            
        }
    },[isAdded])

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
                            <nav className="flex cursor-pointer" onClick={ordersFunc} ><img className="w-4 h-4 mr-1" src="/img/orderIcon.png" alt="order icon" /><span className="fit-content">YOUR ORDER</span></nav>
                            <nav className="flex items-center" >
                                {!token ? <>
                                    <p onClick={() => openLogin()} className="fit-content cursor-pointer mr-4">LOG IN</p><span>|</span><p onClick={() => openSignup()} className="fit-content cursor-pointer ml-4">SIGNUP</p>
                                </>
                                    : <p className="fit-content cursor-pointer ml-4 font-semibold" onClick={() => logout()}>Logout</p>}
                            </nav>
                        </header>
                    </section>
                    {/* header 3 */}
                    <section id="mainHeader" className=" relative">
                    <div id="productAddedToCart" className=" absolute z-50 w-full bottom-0 ">
                            <div className=" w-full flex justify-center ">
                                <p className=" productAddedToCartTag w-fit py-1 px-5 rounded-md font-semibold ">Product added to your cart</p>
                            </div>
                        </div>
                        <header className=" flex justify-center py-2 relative headerContainer">
                            <MobileViewCategory closeCategory={closeCategory} />
                            <div className="navBox3 flex justify-between items-center">
                                <nav className="flex relative">
                                    {/* hamburgerBox */}
                                    <section className="flex hamburgerBox">
                                        <div onClick={openCategory} className=" mr-2  hamShow">
                                            <img className=" w-full" src="/img/hamburger-button.png" alt="" />
                                        </div>
                                        <Link to="/">
                                            <img onClick={goToHomeHandler} className="cursor-pointer w-38 h-10 pr-2 pt-2 pb-2 mr-5 logo" src="/img/beyoungLogo.png" alt="" />
                                        </Link>
                                    </section>
                                    <nav className="flex text-sm font-semibold cursor-pointer navNameList">
                                        <p id="men" className=" relative hover-bg-yellow px-6 py-2 flex items-center catMen" onMouseLeave={menOnMouseLeave} onMouseOver={menOnMouseOver} >MEN <MenCatagory status={stat} clickHandler={() => { onClickHandler() }} /></p>
                                        <p className="relative hover-bg-yellow px-6 py-2 flex  items-center catWomen" onMouseLeave={womenOnMouseLeave} onMouseOver={womenOnMouseOver}>WOMEN <WomenCatagory status2={stat2} clickHandler={() => { onClickHandler() }} /></p>
                                        <p className="hover-bg-yellow relative px-6 py-2 flex items-center catWinter" onMouseLeave={winterOnMouseLeave} onMouseOver={winterOnMouseOver} >WINTER WEARS <div style={{ display: winterDisplay }} onClick={() => { onClickHandler() }} className=" absolute flex flex-col top-10 pt-3 bg-white winterCategory"><Link to={`/category/sweater/Men`}><p onClick={closeCategory} id="sweater" className=" text-sm p-2 font-medium text-left hover-text-yellow">Sweater</p></Link>
                                            <Link to={`/category/hoodie/Men`}><p onClick={closeCategory} id="hoodie" className=" text-sm p-2 text-left font-medium hover-text-yellow">Hoodies</p></Link></div> </p>
                                        <p className="hover-bg-yellow relative px-6 py-2 flex items-center catNew" onMouseLeave={newOnMouseLeave} onMouseOver={newOnMouseOver}>NEW ARRIVALS <div style={{ display: newDisplay }} onClick={() => { onClickHandler() }} className=" absolute flex flex-col top-10 pt-3 pb-1 bg-white newCategory">
                                            <Link to={`/category/shirt/Men`}><p onClick={closeCategory} id="hoodie" className=" text-sm p-2 text-left font-medium hover-text-yellow">New Arrivals</p></Link></div></p>
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
