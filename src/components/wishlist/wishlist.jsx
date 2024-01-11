import { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../contextApi/AppContext";
import Loading from "../loading/loading";

const Wishlist = () => {
    const [loader, setLoader] = useState(true);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const navigate = useNavigate();
    const { token, openLogin, wishlistProducts, setWishlistProducts, } = useContext(AppContext);

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

    return (
        <>
            {favoriteItems.length < 1 ? <div className=" flex justify-center flex-col noWishlistProductBox"><img className=" w-1/4 m-auto noWishlistProductImg" src="https://www.beyoung.in/images/common/EMPTY-WISHLIST-PAGE.jpg" alt="" />
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
                                            <div class="absolute right-2 bottom-1 wrapper" id={val.products._id} >
                                                {wishlistProducts?.includes(val.products._id) ? <div class="icon-wishlist in-wishlist" id={val.products._id + 1} onClick={favoriteIconFunc} ></div> : <div class="icon-wishlist" id={val.products._id + 1} onClick={favoriteIconFunc} ></div>}
                                            </div>
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
                                            <p className="text-left cursor-pointer pt-1">₹{val.products.price}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </section> : <Loading />}

        </>)
}

export default Wishlist;