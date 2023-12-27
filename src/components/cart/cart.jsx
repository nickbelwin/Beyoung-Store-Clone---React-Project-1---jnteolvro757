import Header from "../header/header"
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import { useContext, useEffect, useState } from "react";
import isAuth from "../../isAuth/isAuth";
import { AppContext } from "../../contextApi/AppContext";
import Loading from "../loading/loading";
const Cart = () => {
    const [product, setProduct] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const [loader, setLoader] = useState(true);
    const { token, setTotalCart } = useContext(AppContext);
    const navigate = useNavigate();

    const getCartproducts = async () => {
        console.log("getCart Token", token);
        try {
            setLoader(true);
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
            console.log("cart Data", jsonData);
            setCartProduct([jsonData.data])
            setProduct([...jsonData.data.items]);
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    console.log(cartProduct);
    console.log(product);

    const removeFromCart = async (e) => {
        let productId = e.target.parentNode.id;
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'projectID': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            let jsonData = await getData.json();
            console.log("removedCart Data", jsonData);
            getCartproducts();
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    const moveToWishlist = async (e) => {
        let productId = e.target.parentNode.id;
        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
                {
                    method: 'PATCH',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ "productId": productId })

                }
            );
            let jsonData = await getData.json();
            console.log("added");
            // setFavoriteItems(jsonData.data.items);
        }
        catch (error) {
            console.log("ERROR", error);
        }

    }
    const checkOutHandler = (e) => {
        e.stopPropagation();

        console.log(`/address/${product[0].product._id}/${product[0].quantity}`);
        navigate(`/address/${product[0].product._id}/${product[0].quantity}`)
    }

    useEffect(() => {
        getCartproducts();
    }, [token]);

    return (
        <section className="cartMainbox">
            <header className="headerBox">
                <div className="flex justify-between header">
                    <Link to="/"><img className="cursor-pointer w-38 h-10 pr-2 pt-2 pb-2 logo" src="./img/beyoungLogo.png" alt="" /></Link>
                    <nav className="flex px-8 py-4 secureTag">
                        <div>
                            <img className="w-8 cartSecureIcon" src="./img/cartSecureIcon.png" alt="" />
                        </div>
                        <p className="font-bold text-2xl ml-3 secureText">100% SECURE PAYMENT</p>
                    </nav>
                </div>
            </header>
            <main>
                {/* <div className="flex flex-col headerMainBox ">
                    <img className="emptyCartImg" src="https://www.beyoung.in/desktop/images/checkout/EMPTY%20CARTORDER%20PAGE..png" alt="" />
                    <Link to="/">
                    <button className="py-3 px-40 rounded-lg bg-black text-white font-bold text-xl">Continue Shopping</button>
                    </Link>  
                </div> */}
                {!loader? <div className=" mt-10 checkoutProccessBox">
                    <div className="flex flex-wrap justify-center bg-white w-fit m-auto">
                        <div className="p-5">
                            <div className=" productDiv  overflow-y-scroll">
                                {product.map((val) => {
                                    return (
                                        <>
                                            <div className="flex flex-col m-4 bg-white p-5 products">
                                                <div className="flex mb-2 pb-4 cartImgBox">
                                                    <div className="cartImage">
                                                        <Link to={`/product-details/${val.product._id}`}><img className="" src={val.product.displayImage} alt="" /></Link>
                                                    </div>
                                                    <div className="flex flex-col ml-4 gap-3 ">
                                                        <p className=" w-fit text-left cartProductName">{val.product
                                                            .name
                                                        }</p>

                                                        <p className="text-start w-fit text-xl font-semibold">₹ {val.product
                                                            .price
                                                        }</p>
                                                        <p className=" w-fit text-left">Size: {val.size}</p>
                                                        <p className=" w-fit text-left">Quantity: {val.quantity}</p>
                                                    </div>
                                                </div>
                                                <div id={val.product._id} className="flex">
                                                    <button onClick={removeFromCart} className=" my-2 removeBtn">REMOVE</button>
                                                    <button onClick={moveToWishlist} className=" my-2 w-full moveToFovoritesBtn">MOVE TO FAVORITES</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className=" bg-white py-8 productDetailsBox ">
                            {cartProduct?.map((val) => {
                                return (
                                    <div className="px-8">
                                        <h1 className="py-2 mb-2 font-semibold flex borderBottom">PRODUCT DETAILS ({val.items.length} Items) </h1>
                                        <div className="flex flex-col gap-y-2 text-left mb-3 borderBottom">
                                            <p className=" flex justify-between">Total MRP(inc. of Taxes) <span>{val.totalPrice + 268}</span></p>
                                            <p className=" flex justify-between ">Beyoung Discount <span>-268</span></p>
                                            <p className=" flex justify-between">Shipping <span className=" text-green-500 font-medium"><span className=" text-black text-sm line-through font-normal">₹49</span> Free</span></p>
                                            <p className=" flex justify-between mb-2">Cart Total <span>{val.totalPrice}</span></p>
                                        </div>
                                        <div>
                                            <h2 className=" flex justify-between my-1">Total Amount <span>{val.totalPrice}</span></h2>
                                            <button onClick={checkOutHandler} className=" w-full py-3 text-white font-semibold mt-4 checkoutBtn">CHECKOUT SECURELY</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>: <Loading/>}

            </main>

        </section>
    )
}

export default isAuth(Cart);

