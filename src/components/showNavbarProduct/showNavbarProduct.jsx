import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import "./showNavbarProduct.css"
import Filter from "../filterSection/filter";
import { AppContext } from "../../contextApi/AppContext";
import Filter2 from "../filterSection/filter";
import NotFoundProduct from "../notFound/notFound";
import Loading from "../loading/loading";
import Heart from "react-animated-heart";
import Footer from "../footer/footer";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ShowNavbarProducts = () => {
    const { id, gender } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [selectColor, setSelectColor] = useState("");
    const [selectSize, setSelectSize] = useState("");
    const [selectCheckbox, setSelectCheckbox] = useState("");
    const [prevColor, setPrevColor] = useState("");
    const [prevSize, setPrevSize] = useState("");
    const [prevCheckbox, setPrevCheckbox] = useState("");
    const [colorFlag, setColorFlag] = useState(true);
    const [sizeFlag, setSizeFlag] = useState(true);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [active, setActive] = useState(false);
    const [grow, setGrow] = useState("0");

    const { token, openLogin, wishlistProducts, setWishlistProducts,totalWishlist,setTotalWishlist } = useContext(AppContext);

    console.log(id);
    // const body= {a:1};
    const getProducts = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${id}"}&filter={"gender":"${gender}"}`,
                {
                    method: 'GET',
                    headers: { 'projectId': 'zx5u429ht9oj' },
                }
            );
            let data = await getData.json();
            console.log("data: ", data);
            if (data.status === "success") {
                setProduct(data.data);
                setFilterProducts(data.data);
            }
            else if(data.status==="fail"){
                setGrow("0");
            }
            setLoader(false);
            // console.log("setProduct 0:", product)
        }
        catch (error) {
            console.log("Error: ", error);
            setLoader(false);
        }
        // console.log("setProduct 0:", product)
    }
    useEffect(() => {
        getProducts();
    }, [id, token]);

    const linkHandler = (productid) => {
        navigate(`/product-details/${productid}`);
    }

    // fovorite icon function and Add Item to wishlist------------

    const addFavotiteItems = async (idx) => {
        console.log(token, "===", idx);
        console.log(JSON.stringify({ "productId": idx }))
        let obj = { "productId": idx }
        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,
                {
                    method: 'PATCH',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...obj })

                }
            );
            let jsonData = await getData.json();
            console.log("added", jsonData);
            let cartItem = jsonData.data.items;
            cartItem = cartItem.map((val) => {
                return val.products._id;
            });
            console.log("cart", cartItem);
            setTotalWishlist(cartItem.length);
        }
        catch (error) {
            console.log("ERROR", error);
        }
    }
    const removeFavoriteItem = async (idx) => {
        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${idx}`,
                {
                    method: 'DELETE',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
            );
            let jsonData= await getData.json();
            let cartItem = jsonData.data.items;
            cartItem = cartItem.map((val) => {
                return val.products._id;
            });
            console.log("cart", cartItem);
            setTotalWishlist(cartItem.length);

        } catch (error) {
            console.log(error)
        }
    }
    const getCartProducts = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,
                {
                    method: 'GET',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            let jsonData = await getData.json();
            let cartItem = jsonData.data.items;
            setFavoriteItems(cartItem);
            cartItem = cartItem.map((val) => {
                return val.products._id;
            });
            console.log("cart", cartItem);
            setWishlistProducts(cartItem);
            setTotalWishlist(cartItem.length);
        }
        catch (error) {
            console.log("ERROR", error);
        }
        console.log(wishlistProducts);
    }
    console.log(wishlistProducts);

    const favoriteIconFunc = (e, productid) => {
        e.stopPropagation();
        let idx = e.target.id;
        console.log("idx", idx);
        if (token) {
            if (!wishlistProducts.includes(productid)) {
                document.getElementById(idx).classList.add("in-wishlist");
                setWishlistProducts([...wishlistProducts,productid]);
                addFavotiteItems(productid);
                console.log("added")
            }
            else {
                document.getElementById(idx).classList.remove("in-wishlist");
                let data= wishlistProducts.filter((val)=>{
                    return val!==productid;
                });
                setWishlistProducts(data);
                removeFavoriteItem(productid);
                console.log("removed")
            }
        } else {
            openLogin();
        }
    }

    useEffect(() => {
        if (!token) {
            setWishlistProducts([])
            setTotalWishlist(0);
        }
    }, [token])
    useEffect(() => {
        getCartProducts();
    }, [token]);


    // Filter code -----------------------------------------------------------------------------

    const getAllColor = () => {
        let color = product?.map((val) => {
            return val.color;
        });
        console.log("color=> ", color);
        color = Array.from(new Set(color));
        setAllColors(color);
    }

    const getAllSizes = () => {
        let size = product?.map((val) => {
            return val.size;
        });
        let newSize = [];
        size?.forEach((val) => {
            newSize.push(...val);
        })
        size = [...newSize];
        console.log("newSize => ", newSize);
        size = Array.from(new Set(size));
        setAllSizes(size);
    }
    // close function for closing colors and size box
    const closeFunc = (e) => {
        console.log("color:", e.target.parentNode.id);
        if (e.target.parentNode.id === "color") {
            if (colorFlag) {
                document.getElementById("allColors").style.display = "none";
                document.getElementById("colorArrow").style.transform = "rotate(-90deg)";
                setColorFlag(false);
            }
            else {
                document.getElementById("allColors").style.display = "flex";
                document.getElementById("colorArrow").style.transform = "rotate(90deg)";
                setColorFlag(true);
            }

        }
        else {
            if (sizeFlag) {
                document.getElementById("allSizes").style.display = "none";
                document.querySelector(".sizeArrow").style.transform = "rotate(-90deg)";
                setSizeFlag(false);
            }
            else {
                document.getElementById("allSizes").style.display = "block";
                document.querySelector(".sizeArrow").style.transform = "rotate(90deg)";
                setSizeFlag(true);
            }

        }
    }
    // to close mobile site filter section
    const closeFilter = (e) => {
        e.stopPropagation();
        document.getElementById("mobileFilterCover").style.transform = "translateX(-100rem)";
    }
    // function for check which color is selected
    const checkColor = (e) => {
        closeFilter(e);
        let id = e.target.id;
        if (prevColor != id) {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "1px solid rgb(203, 203, 203)";
            });
            document.getElementById(id).style.border = "1px solid blue";
            setSelectColor(id);
            setPrevColor(id);
        }
        else {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "none";
            });
            setFilterProducts(product);
            setSelectColor("");
            setPrevColor("");

        }
    }
    const selectedColorMobile = (e) => {
        closeFilter(e);
        let id = e.target.id;
        if (prevColor != id) {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "1px solid gray";
            });

            document.getElementById(id).style.border = "1px solid blue";
            setFilterProducts(product);
            setSelectColor(id);
            setPrevColor(id);
        }
        else {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "none";
            });
            setFilterProducts(product);

            setSelectColor("");
            setPrevColor("");

        }
    }
    // function for check which size is selected
    const checkSize = (e) => {
        closeFilter(e);
        let id = e.target.id;
        if (prevSize != id) {
            allSizes?.forEach((val) => {
                document.getElementById(val).style.color = "";
            })
            document.getElementById(id).style.color = "blue";
            setSelectSize(id);
            setPrevSize(id);

        }
        else {
            allSizes?.forEach((val) => {
                document.getElementById(val).style.color = "";
            })
            setFilterProducts(product);
            setPrevSize("");
            setSelectSize("");
        }


    }
    // function for low to high and high to low checkbox
    const checkboxHandler = (idx) => {
        if (idx != prevCheckbox) {
            document.getElementById("lth").checked = false;
            document.getElementById("htl").checked = false;
            setPrevCheckbox(idx);
            document.getElementById(idx).checked = true;
            setSelectCheckbox(idx);
            if (idx === "lth") {
                let data = filterProducts.sort((a, b) => {
                    return a.price - b.price;
                })
                setFilterProducts(data);
            }
            else if (idx === "htl") {
                let data = filterProducts.sort((a, b) => {
                    return b.price - a.price;
                })
                setFilterProducts(data);
            }
        }
        else {
            document.getElementById(idx).checked = false;
            if (!selectSize && !selectColor) {
                getProducts();
            }
            filterColor();
            setSelectCheckbox("");
            setPrevCheckbox("");
        }
    }
    // function for get the product by selected color and size
    const filterColor = () => {
        if (selectColor && selectSize) {
            let selectedAllFilter = product?.filter((val) => {
                if (selectColor === val.color && val.size.includes(selectSize)) {
                    return val;
                }
            });
            setFilterProducts(selectedAllFilter);
        }
        else if (selectColor) {

            let selectedColor = product?.filter((val) => {
                if (selectColor === val.color) {
                    return val;
                }
            });
            setFilterProducts(selectedColor);

        }
        else if (selectSize) {
            let selectedSize = product?.filter((val) => {
                if (val.size.includes(selectSize)) {
                    return val;
                }
            });
            setFilterProducts(selectedSize);
        }
        console.log("filterProducts", filterProducts);
    }

    useEffect(() => {
        filterColor()
    }, [selectColor, selectSize]);

    // this useEffect call given function for getting all colors and sizes
    useEffect(() => {
        getAllColor();
        getAllSizes();
    }, [product]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id, selectColor, selectSize, filterProducts]);

    useEffect(() => {
        if (product) {
            setGrow("1")
        } else {
            setGrow("0")
        }
    }, [product]);

    useEffect(() => {
        filterProducts.map((val) => {
            console.log(val.displayImage);
        });
    }, [filterProducts]);

    return (
        <>

            <section className="flex pb-10 relative justify-start pt-7 mt-10 navCategoryBox">
                {!loader ? product?.length >= 1 && product ? <div className=" overflow-y-scroll filterSide">
                    <Filter className="justify-start" checkboxHandler={checkboxHandler} allColors={allColors} allSizes={allSizes} closeFuncHandler={closeFunc} selectedColor={checkColor} selectedSize={checkSize} closeFilter={closeFilter} />
                </div> : <NotFoundProduct /> : ""}
                <div style={{ flexGrow: grow }} id="allCardBoxId" className="flex relative mt-7 flex-wrap  gap-8 pt-24 allCardBox">
                    {!loader && product?.length >= 1 ?
                        <>
                            <h1 className=" absolute text-left w-full text-lg font-semibold productCategory">{id} ( <span className=" text-green-600">{filterProducts?.length}</span> )</h1>
                            <p className=" absolute text-left top-2 font-light text-base productCategoryInfo" > <span className=" font-semibold">{id[0].toLocaleUpperCase()}{id.slice(1, id.length)} for {gender}</span> - Buy trending <span className=" font-medium">{id.toLocaleLowerCase()}</span> for {gender.toLocaleLowerCase()} online in India at Beyoung. We offer a collection of {product?.length === 1 ? 1 : product?.length - 1 + "+"} {gender.toLocaleLowerCase()}s <span className=" font-medium">{id.toLocaleLowerCase()}s</span> online. You can get ₹100 OFF on all best <span className=" font-medium">{id.toLocaleLowerCase()}</span> for {gender.toLocaleLowerCase()} when you spend more than ₹999, use the coupon code "BEYOUNG100". Free Shipping. COD Available.</p>
                        </> : ""}
                    {!loader ? filterProducts?.length >= 1 && filterProducts?.map((val) => {
                        return (
                            <div className=" text-left  card" onClick={() => { linkHandler(val._id) }} key={val._id}>
                                <LazyLoadImage className="image rounded-md" src={val.displayImage} placeholderSrc={"https://www.beyoung.in/beyloader-long.gif"} alt={val.subCategory} />
                                {/* <img className="image rounded-md" src={val.displayImage} alt="" />  */}
                                <span className="cardName cursor-pointer text-left text-slate-700 font-semibold">{val.name}</span>
                                <span className="text-left cursor-pointer text-gray-400 text-sm">{val.subCategory}</span>
                                <p className="text-left flex justify-between mt-2">₹{val.price} <div class=" mr-3 wrapper" >
                                    {wishlistProducts?.includes(val._id) ? <div class="icon-wishlist in-wishlist" id={val._id + 1} onClick={(e) => { favoriteIconFunc(e, val._id) }} ></div> : <div class="icon-wishlist" id={val._id + 1} onClick={(e) => { favoriteIconFunc(e, val._id) }}></div>}
                                </div></p>
                            </div>

                        )
                    }) : <Loading />}
                </div>
                {!loader ? <div className=" absolute footerBottom">
                    <Footer />
                </div> : ""}
            </section>

        </>

    )
}

export default ShowNavbarProducts;