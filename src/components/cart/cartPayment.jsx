import { useContext, useEffect, useState } from "react";
import "./cart.css";
import { AppContext } from "../../contextApi/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const CartPayment = () => {
    const [cartProduct, setCartProduct] = useState([]);
    const [allOrderProduct, setAllOrderProduct] = useState([]);
    const [paymentType, setPaymentType] = useState("");
    const [orderDone, setOrderDone] = useState(false);
    const [loader, setLoader] = useState(true);
    const { token,totalCart, setTotalCart, userAddress } = useContext(AppContext);
    const [payMsg, setPayMsg] = useState(false);
    const [doneMsg, setDoneMsg] = useState("none");
    const { id, qty } = useParams();
    const navigate = useNavigate();
    console.log("payment", userAddress, id, qty);

    // get all orders
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
            setCartProduct([jsonData.data]);
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    console.log("cartProduct=>",cartProduct);
    // for update the product id and quantity for place orders
    const allOrders = () => {
        let update = { ...userAddress[1] };
        console.log("1==", cartProduct[0]?.items);
        let getData = cartProduct[0]?.items?.map((val) => {
            return { ...update, productId: val.product._id, quantity: val.quantity };
        });
        setAllOrderProduct(getData);
    }
    console.log("allOrderProduct", allOrderProduct);

    useEffect(() => {
        if (token) {
            getCartproducts();
        }
    }, [token]);

    useEffect(() => {
        allOrders();
    }, [cartProduct]);

    // here orders are posting
    const placeOrder = async (productObj) => {
        try {
            setLoader(true);
            let getData = await fetch("https://academics.newtonschool.co/api/v1/ecommerce/order",
                {
                    method: 'POST',
                    headers: {
                        'projectID': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...productObj })
                })

            let data = await getData.json();
            console.log("placeOrder", data);


        } catch (error) {
            console.log(error)
            setLoader(false);
        }
    }
    // sending the body object for place orders
    const sendOrders = () => {
        if (paymentType && cartProduct) {
            allOrderProduct?.forEach((val) => {
                placeOrder(val);
            });
            setDoneMsg("flex");
            setOrderDone(true);
            setLoader(false);
        } else {
            window.scrollTo(0,0);
            setPayMsg(true);
        }
    }
    // here removing product after order placed
    const removeFromCart = async () => {

        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/`,
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
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    // passing the product id for removing product from cart after order placed
    const orderSuccess = () => {
        removeFromCart();
        setPaymentType("");
        setDoneMsg("none");
        setOrderDone(false);
        setTotalCart(0);
        navigate("/");
    }
    // selecting payment method
    const paymentIdArr = ["paytm", "debitCredit", "upi", "wallet", "netbanking", "cashOnDelivery"]
    const selectPaymentOption = (e) => {
        let payId = e.target.parentNode.id ? e.target.parentNode.id : e.target.id;
        paymentIdArr.forEach((val) => {
            document.getElementById(val).style.backgroundColor = "#F4F4F6";
            document.getElementById(val).style.border = "none";
        })
        document.getElementById(payId).style.backgroundColor = "white";
        document.getElementById(payId).style.border = "1px solid black";
        setPaymentType(payId);
        setPayMsg(false);
    }
    return (<>
        <section className="pt-11 addressMainbox">
            <header className=" sticky top-0 left-0 headerBox">
                <div className=" w-4 h-4 fixed" >
                    {!orderDone ? "":
                        <div style={{ display: doneMsg }} className=" flex-col paymentMsg">
                            <div className="flex flex-col bg-white text-green-500 font-extrabold py-4 px-10 rounded">Order Successfully Placed...<button onClick={orderSuccess} className=" text-white font-semibold py-1 mt-5 rounded backToShopBtn" >Continue Shopping</button></div>
                        </div>}
                </div>
                <div className="flex justify-between header">
                    <Link to="/"><img className="cursor-pointer w-38 h-10 pr-2 pt-2 pb-2 logo" src="/img/beyoungLogo.png" alt="" /></Link>
                    <nav className="flex px-8 py-4 secureTag">
                        <div>
                            <img className="w-8 cartSecureIcon" src="/img/cartSecureIcon.png" alt="" />
                        </div>
                        <p className="font-bold text-2xl ml-3 secureText">100%<span className=" text-gray-100">_</span>SECURE<span className=" text-gray-100">_</span>PAYMENT</p>
                    </nav>
                </div>
            </header>
            {/* cart timeline */}
            { userAddress[0]?.username && totalCart ? 
                <>
                {!loader? <div className="flex m-auto bg-white p-3 mt-4  w-3/4 justify-center">
                    <div className="flex w-2/3 justify-center cartTimeLine ">
                        <div className=" flex flex-col justify-center cartLineIconBox">
                            <div className=" w-10 p-2 bg-white cartLineIcon">
                                <img src="https://www.beyoung.in/mobile/images/home/new/Cart.png" alt="" />
                            </div>
                            <p className=" text-xs">My<span className=" text-white">_</span>Cart</p>
                        </div>
                        <div className=" mb-3 cartLine"></div>
                        <div className=" flex flex-col justify-center cartLineIconBox">
                            <div className=" w-10 p-2 bg-white cartLineIcon">
                                <img src="https://www.beyoung.in/mobile/images/home/new/Location-Filled.png" alt="" />
                            </div>
                            <p className=" text-xs ">Address</p>
                        </div>
                        <div className="mb-3 cartLine"></div>
                        <div className=" flex flex-col justify-center cartLineIconBox">
                            <div className=" w-10 p-2 bg-white cartLineIcon">
                                <img src="https://www.beyoung.in/mobile/images/home/new/Payment-Filled.png" alt="" />
                            </div>
                            <p className=" text-xs ">Payment</p>
                        </div>
                    </div>
                </div>:""}
                {!loader ?
                    <div className="flex flex-wrap justify-center mt-5 w-fit m-auto pt-4 addressAllBox ">
                        <div className=" mr-3 mb-3 p-3 bg-white addressDiv">
                            <div className=" relative overflow-hidden">
                            <li className=" text-left mb-3 pl-3 font-semibold">CHOOSE PAYMENT METHOD</li>
                            <p style={{top: !payMsg? "4rem":"1rem"}} className=" absolute text-left text-base top-5 font-semibold ml-3 mb-1 text-red-600 bg-white errorMsg">Please Select Payment Method!!!</p>
                            </div>
                            <div className="p-1 addressFormBox paymentBox">
                                <div style={{border: !payMsg? "none":"1px solid red"}} onClick={selectPaymentOption} className=" flex flex-col paymentSections">
                                    <div id="paytm" ><img src="https://i.pinimg.com/736x/0f/9c/e9/0f9ce975819decad215620187697cdc1.jpg" alt="" />Pay With Paytm</div>
                                    <div id="debitCredit"><img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/debit-credit-card-icon.png" alt="" /> Debit/Credit Card</div>
                                    <div id="upi"><img src="https://getlogo.net/wp-content/uploads/2020/10/unified-payments-interface-upi-logo-vector.png" alt="" />UPI</div>
                                    <div id="wallet"><img src="https://i.pinimg.com/1200x/98/4d/d7/984dd7865d06ed7186f77236ae88c3ad.jpg" alt="" />Wallet <span className=" text-xs ml-1 mt-1 font-bold text-green-500"> Offers</span></div>
                                    <div id="netbanking"><img src="https://cdn-icons-png.flaticon.com/512/4826/4826345.png" alt="" />Netbanking</div>
                                    <div id="cashOnDelivery"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUGUF_c53BOG-qECe5Z3hLDLGM9kQDlLXuYg&usqp=CAU" alt="" />Cash on Delivery</div>
                                </div>
                                <div></div>
                            </div>
                        </div>
    
                        <div className=" productDetailsBox ">
                            <div className=" bg-white flex flex-col justify-center mb-3 h-44 p-3">
                                <div className="flex">
                                    <img className=" w-8" src="/img/checked.png" alt="" />
                                    <p ><span className=" font-semibold">Deliver To: </span>{userAddress[0]?.username}</p>
                                </div>
                                <p className=" text-left "><span className=" font-semibold">Address: </span>{userAddress[0]?.street}</p>
                                <p className=" text-left "><span className=" font-semibold">City: </span> {userAddress[0]?.city}</p>
                                <p className=" text-left"><span className=" font-semibold">State: </span> {userAddress[0]?.state}</p>
    
                            </div>
                            {cartProduct?.map((val) => {
                                return (
                                    <div className=" bg-white px-3 py-6">
                                        <h1 className="py-2 mb-5 font-semibold flex borderBottom">PRODUCT DETAILS ({val.items.length} Items) </h1>
                                        <div className="flex flex-col gap-y-2 text-left mb-3 borderBottom">
                                            <p className=" flex justify-between">Total MRP(inc. of Taxes) <span>{val.totalPrice + 268}</span></p>
                                            <p className=" flex justify-between ">Discount <span>-268</span></p>
                                            <p className=" flex justify-between">Shipping <span className=" text-green-500 font-medium"><span className=" text-black text-sm line-through font-normal">₹49</span> Free</span></p>
                                            <p className=" flex justify-between mb-2">Cart Total <span>{val.totalPrice}</span></p>
                                        </div>
                                        <h2 className=" flex justify-between my-1">Total Amount <span>{val.totalPrice}</span></h2>
                                        <button onClick={sendOrders} className=" w-full py-3 text-white font-semibold mt-4 checkoutBtn">CHECKOUT SECURELY</button>
                                    </div>
                                )
                            })}
    
                        </div>
                    </div> : <div className="flex justify-center cartLoading"><img className="" src="https://www.beyoung.in/beyoung-loader.gif" /></div>}
                </>
                    : 
                    <div className="flex flex-col headerMainBox ">
                        <img className="emptyCartImg" src="/img/orderPlaced.webp" alt="" />
                        <p className=" font-semibold text-2xl mb-4">Order Placed Successfully!!!</p>
                        <Link to="/">
                            <button className="py-3 px-40 rounded-lg bg-black text-white font-bold text-xl cartContinueBtn">Continue Shopping</button>
                        </Link>
                    </div> }
        </section>
    </>)
}

export default CartPayment;