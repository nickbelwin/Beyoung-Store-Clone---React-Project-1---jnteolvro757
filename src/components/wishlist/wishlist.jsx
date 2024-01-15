import { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../contextApi/AppContext";
import Loading from "../loading/loading";

const Wishlist = () => {
    const [loader, setLoader] = useState(true);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState("S");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [addToCartData, setAddToCartData] = useState({ quantity: 1, size: "S" });
    const navigate = useNavigate();
    const { token, openLogin, wishlistProducts, setWishlistProducts, setTotalCart } = useContext(AppContext);

    const getWishlistProducts = async () => {
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
            console.log("wishlist", cartItem);
            setLoader(false);
        }
        catch (error) {
            console.log("ERROR", error);
            setLoader(false);
        }
        console.log(favoriteItems);
    }
    const linkHandler = (e) => {
        e.stopPropagation();
        navigate(`/product-details/${e.target.parentNode.id}`);
    }
    const getWishProductId = async () => {
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
            cartItem = cartItem.map((val) => {
                return val.products._id;
            });
            setWishlistProducts(cartItem);
        }
        catch (error) {
            console.log("ERROR", error);
        }
    }
    // useEffect(()=>{
    //     getWishProductId();
    // },[token]);
    useEffect(() => {
        getWishProductId();
        getWishlistProducts();
    }, [token]);

    const favoriteIconFunc = (e) => {
        e.stopPropagation();
        let parentId = e.target.parentNode.id;
        let idx = e.target.id;
        console.log("parentId", parentId)
        console.log("idx", idx);
        if (token) {
            if (!wishlistProducts.includes(parentId)) {
                document.getElementById(idx).classList.add("in-wishlist");

                console.log("added")
            }
            else {
                document.getElementById(idx).classList.remove("in-wishlist");
                removeFavoriteItem(parentId)
                console.log("removed")
            }
        } else {
            openLogin();
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
            getWishlistProducts();
        } catch (error) {
            console.log(error)
        }
    }
    const getCartCount = async () => {
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
            setTotalCart(jsonData.data.items.length);
        }
        catch (error) {
            console.log(error);
        }
    }
    const patchCart = async (idx) => {
        console.log("patchCart Token", token, "id: ", idx);

        console.log(JSON.stringify({ ...addToCartData }))
        try {

            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${idx}`,
                {
                    method: 'PATCH',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...addToCartData })
                }
            );
            if (getData.ok) {
                let data = await getData.json();
                console.log("patch Data", data);
                removeFavoriteItem(idx);
                getCartCount();
                getCartproducts();



            }
            setLoader(false);
        }
        catch (error) {
            console.log(error);
        }
    }
    const checkQuantity = (e) => {

        setSelectedQuantity(parseInt(e.target.value));
    }
    const checkSize = (e) => {
        setSelectedSize(e.target.value);

    }
    const addToCartHandler = (e, idx) => {
        e.stopPropagation();
        if (token) {
            if (selectedQuantity && selectedSize) {
                console.log(selectedQuantity, selectedSize);
                patchCart(idx);
            }
            else if (!selectedQuantity) {
                alert("please select quantity")
            }
            else if (!selectedSize) {
                alert("please select size")
            }
        } else {
            openLogin();
        }
    }
    useEffect(() => {
        setAddToCartData({ ...addToCartData, quantity: selectedQuantity, size: selectedSize });
    }, [selectedQuantity, selectedSize]);

    return (
        <>
            {!loader && favoriteItems.length < 1 ? <div className=" flex justify-center flex-col noWishlistProductBox"><img className=" w-1/4 m-auto noWishlistProductImg" src="https://www.beyoung.in/images/common/EMPTY-WISHLIST-PAGE.jpg" alt="No wishlist items" />
                <Link to="/">
                    <button className="py-3 px-40 rounded-lg bg-yellow-400  font-bold text-xl cartContinueBtn">Continue Shopping</button>
                </Link>
            </div> :
                !loader ?
                    <section className=" wishlistMainBox">
                        <h1 className=" font-bold mb-5 p-3 text-lg wishlistTag">Wishlist</h1>
                        <div className="flex flex-wrap gap-5 wishlistItems">
                            {token && wishlistProducts && favoriteItems?.map((val) => {
                                return (
                                    <div onClick={linkHandler} key={val.products._id} className=" cursor-pointer">
                                        <div className=" relative wishlistCard" id={val.products._id}>

                                            {val.products.displayImage ? <img className="image rounded-md" src={val.products.displayImage} alt="" /> : <Loading />}
                                            <span className="cardName cursor-pointer text-left text-slate-700 font-semibold">{val.products.name}</span>
                                            {/* <span className="text-left cursor-pointer text-gray-400 text-sm">rating {Math.floor(val.products.ratings)}</span> */}
                                            <div className="flex mr-3 pt-1">
                                                {[...Array(Math.floor(val.products.ratings))].map((val) => {
                                                    console.log("img");
                                                    return (
                                                        <img className=" mb-1 mr-0.5 w-4" src="https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-like-32386.png" alt="" />
                                                    )
                                                })}
                                            </div>
                                            <div className="flex px-1 justify-between">
                                                <p className="text-left cursor-pointer pt-1">₹{val.products.price}</p>
                                                <div class=" wrapper" id={val.products._id} >
                                                    <div class="icon-wishlist in-wishlist" id={val.products._id + 1} onClick={favoriteIconFunc} ></div>
                                                </div>
                                            </div>
                                            <div className=" grid grid-cols-2 px-1 gap-1 w-full">
                                                {/* selected Quantity */}
                                                <div onClick={(e) => { e.stopPropagation() }} className=" w-full my-2">
                                                    <select onChange={checkQuantity} className=" w-full rounded borderWishlist" >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>
                                                {/* selected size */}
                                                <div onClick={(e) => { e.stopPropagation() }} className=" w-full rounded my-2">
                                                    <select onChange={checkSize} className=" w-full rounded borderWishlist" >
                                                        <option value="S">S</option>
                                                        <option value="M">M</option>
                                                        <option value="XL">XL</option>
                                                        <option value="XXL">XXL</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button onClick={(e) => { addToCartHandler(e, val.products._id) }} className="bg-sky-400 w-full justify-center py-2 relative font-semibold text-base cartbtn ">{!loader ? "" : <img className=" absolute left-12 w-10 mr-2" src="https://www.beyoung.in/beyoung-loader.gif" />}<img src="https://www.beyoung.in/desktop/images/product-details-2/cart.svg" alt="" />ADD<span className="text-sky-400">_</span>TO<span className="text-sky-400">_</span>CART</button>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </section> : <Loading />}

        </>)
}

export default Wishlist;