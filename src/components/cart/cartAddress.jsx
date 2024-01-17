import { Link, useNavigate, useParams } from "react-router-dom";
import "./cart.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contextApi/AppContext";
import Loading from "../loading/loading";

const UserAddress = () => {
    const [cartProduct, setCartProduct] = useState([]);
    const [product, setProduct] = useState("");
    const [loader, setLoader] = useState(true);
    const [allInfo, setAllInfo] = useState(false);
    const [allInfoMsg, setAllInfoMsg] = useState("none");
    const { token, setTotalCart,totalCart, setUserAddresss } = useContext(AppContext);
    const { id, qty } = useParams();
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`,
                {
                    method: 'GET',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            let jsonData = await getData.json();
            setCartProduct([jsonData.data]);
            setProduct([...jsonData.data.items]);
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    console.log("product", product, id, qty);

    useEffect(() => {
        if (token) {
            getProduct();
        }
    }, [token]);

    const [user, setUser] = useState({ productId: id, quantity: qty, "addressType": "HOME", });
    const [userAddress, setUserAddress] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: '',
    })
    const [userInfo, setUserInfo] = useState({
        username: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: '',
    });


    const UserAddressHandler = (e) => {
        if (e.target.id === "street") {
            let update = { ...userAddress };
            update = { ...update, street: e.target.value }
            setUserAddress(update);
            let userUpdate = { ...userInfo };
            userUpdate = { ...userUpdate, street: e.target.value };
            setUserInfo(userUpdate);

        }
        else if (e.target.id === "city") {
            let update = { ...userAddress };
            update = { ...update, city: e.target.value }
            setUserAddress(update);
            let userUpdate = { ...userInfo };
            userUpdate = { ...userUpdate, city: e.target.value };
            setUserInfo(userUpdate)
        }
        else if (e.target.id === "state") {
            let update = { ...userAddress };
            update = { ...update, state: e.target.value }
            setUserAddress(update);
            let userUpdate = { ...userInfo };
            userUpdate = { ...userUpdate, state: e.target.value };
            setUserInfo(userUpdate)
        }
        else if (e.target.id === "country") {
            let update = { ...userAddress };
            update = { ...update, country: e.target.value }
            setUserAddress(update);
            let userUpdate = { ...userInfo };
            userUpdate = { ...userUpdate, country: e.target.value };
            setUserInfo(userUpdate)
        }
        else if (e.target.id === "pinCode") {
            let update = { ...userAddress };
            update = { ...update, zipCode: e.target.value }
            setUserAddress(update);
            let userUpdate = { ...userInfo };
            userUpdate = { ...userUpdate, zipCode: e.target.value };
            setUserInfo(userUpdate);
        } else if (e.target.id === "username") {
            let userUpdate = { ...userInfo };
            userUpdate = { ...userUpdate, username: e.target.value };
            setUserInfo(userUpdate);
        }
    }

    console.log("user", user);

    // const getCartproducts = async () => {
    //     console.log("getCart Token", token);
    //     try {
    //         setLoader(true);
    //         let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'projectID': 'zx5u429ht9oj',
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         let jsonData = await getData.json();
    //         console.log("cart Data", jsonData);
    //         setCartProduct([jsonData.data])
    //         setLoader(false);
    //     }
    //     catch (error) {
    //         console.log(error);
    //         setLoader(false);
    //     }
    // }

    const placeOrder = () => {
        // let update= {...user, address:{...userAddress}}
        // console.log("update",update);
        // setUser(update);
        if (userInfo.username && userInfo.street && userInfo.state && userInfo.country && userInfo.city && userInfo.zipCode) {
            setUserAddresss([userInfo, user]);
            navigate(`/payment/${id}/${qty}`);
        }
        else {
            setAllInfoMsg("flex");
        }

        // try{
        //     let getData= await fetch("https://academics.newtonschool.co/api/v1/ecommerce/order",
        //     {
        //         method: 'POST',
        //         headers: {
        //             'projectID': 'zx5u429ht9oj',
        //             "Authorization": `Bearer ${token}`,
        //         },
        //         body: JSON.stringify({...user})
        //     })
        //     let data = getData.json();
        //     console.log("placeOrder", data);

        // }catch(error){
        //     console.log(error)
        // }
    }
    useEffect(() => {
        let update = { ...user, address: { ...userAddress } }
        console.log("update", update);
        setUser(update);
    }, [userAddress])
    // useEffect(() => {
    //     getCartproducts();
    // }, [])
    return (
        <>
            <section className="addressMainbox">
                <header className=" sticky top-0 left-0 headerBox">
                    <div className=" w-4 h-4 fixed" >
                        {!allInfo ?
                            <div style={{ display: allInfoMsg }} className=" flex-col paymentMsg">
                                <div className="flex flex-col bg-white py-4 px-10 rounded">Please Enter All Information!!! <button onClick={() => setAllInfoMsg("none")} className=" bg-red-600 text-white font-semibold py-1 mt-5 rounded payCloseBtn" >Close</button></div>
                            </div> :
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
                            <p className="font-bold text-2xl ml-3 secureText">100% SECURE PAYMENT</p>
                        </nav>
                    </div>
                </header>
                <header className="headerBox">
                    <div className="flex justify-between header">
                        <Link to="/"><img className="cursor-pointer w-38 h-10 pr-2 pt-2 pb-2 logo" src="/img/beyoungLogo.png" alt="" /></Link>
                        <nav className="flex px-8 py-4 secureTag">
                            <div>
                                <img className="w-8 cartSecureIcon" src="/img/cartSecureIcon.png" alt="" />
                            </div>
                            <p className="font-bold text-2xl ml-3 secureText">100% SECURE PAYMENT</p>
                        </nav>
                    </div>
                </header>
                {!loader? <div className="flex m-auto bg-white p-3 mt-4  w-3/4 justify-center">
                    <div className="flex w-2/3 justify-center cartTimeLine ">
                        <div className=" flex flex-col justify-center cartLineIconBox">
                            <div className=" w-10 p-2 bg-white cartLineIcon">
                                <img src="https://www.beyoung.in/mobile/images/home/new/Cart.png" alt="" />
                            </div>
                            <p className=" text-xs">My Cart</p>
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
                                <img src="https://www.beyoung.in/mobile/images/home/new/Payment-outline.png" alt="" />
                            </div>
                            <p className=" text-xs opacity-20">Payment</p>
                        </div>
                    </div>
                </div>:""}
                {totalCart? !loader ?
                    <div className=" mt-10 w-fit m-auto addressAllBox">
                        <div className=" mr-9 bg-white p-5 addressDiv">
                            <li className=" text-left mb-6 font-semibold pl-5 pt-2">Delivery Address</li>
                            <form className=" flex flex-wrap mb-4 gap-x-4 gap-y-5 addressFormBox">
                                <input onChange={UserAddressHandler} id="username" type="text" placeholder="Your Name*" required />
                                <input onChange={UserAddressHandler} id="street" type="text" placeholder="Address (House No, Building,Street,Area)*" required />
                                <input onChange={UserAddressHandler} id="city" type="text" placeholder="City/District*" required />
                                <input onChange={UserAddressHandler} id="state" type="text" placeholder="State*" required />
                                <input onChange={UserAddressHandler} id="country" type="text" placeholder="Country*" required />
                                <input onChange={UserAddressHandler} id="pinCode" type="number" placeholder="Pin Code*" required />
                            </form>
                        </div>
                        <div className=" bg-white py-8 productDetailsBox ">
                            {cartProduct?.map((val) => {
                                return (
                                    <div className="px-8">
                                        <h1 className="py-2 mb-2 font-semibold flex borderBottom">PRODUCT DETAILS ({val?.items?.length} Items) </h1>
                                        <div className="flex flex-col gap-y-2 text-left mb-3 borderBottom">
                                            <p className=" flex justify-between">Total MRP(inc. of Taxes) <span>{val?.totalPrice + 268}</span></p>
                                            <p className=" flex justify-between ">Discount <span>-268</span></p>
                                            <p className=" flex justify-between">Shipping <span className=" text-green-500 font-medium"><span className=" text-black text-sm line-through font-normal">₹49</span> Free</span></p>
                                            <p className=" flex justify-between mb-2">Cart Total <span>{val.totalPrice}</span></p>
                                        </div>
                                        <h2 className=" flex justify-between my-1">Total Amount <span>{val.totalPrice}</span></h2>
                                        <button onClick={placeOrder} className=" w-full py-3 text-white font-semibold mt-4 checkoutBtn">CHECKOUT SECURELY</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div> : <div className="flex justify-center cartLoading"><img className="" src="https://www.beyoung.in/beyoung-loader.gif" /></div>:
                    <div className="flex flex-col headerMainBox ">
                        <img className="emptyCartImg" src="/img/orderPlaced.webp" alt="" />
                        <p className=" font-semibold text-2xl mb-4">Order Placed Successfully!!!</p>
                        <Link to="/">
                            <button className="py-3 px-40 rounded-lg bg-black text-white font-bold text-xl cartContinueBtn">Continue Shopping</button>
                        </Link>
                    </div>}
                
            </section>
        </>
    )
}

export default UserAddress;