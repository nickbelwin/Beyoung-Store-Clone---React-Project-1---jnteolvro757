import { Link, useParams } from "react-router-dom";
import "./cart.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contextApi/AppContext";

const UserAddress = () => {
    const [cartProduct, setCartProduct] = useState([]);
    const [product, setProduct] = useState("");
    const [loader, setLoader] = useState(true);
    const { token, setTotalCart } = useContext(AppContext);
    const {id,qty}=useParams();

    const getProduct = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`,
                {
                    method: 'GET',
                    headers: { 'projectId': 'zx5u429ht9oj',
                    "Authorization": `Bearer ${token}`, }
                }
            );
            let jsonData = await getData.json();
            setProduct([...jsonData.data.items]);
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    console.log("product",product,id,qty)
    useEffect(()=>{
        getProduct();
    },[id]);

    const [user, setUser] = useState({ productId:id, quantity: qty,  "addressType": "HOME", 
    address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: '',
      },});
    

    const UserAddressHandler = (e) => {
        if (e.target.id === "street") {
            let update = { ...user };
            update = { ...update, street: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "city") {
            let update = { ...user };
            update = { ...update, city: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "state") {
            let update = { ...user };
            update = { ...update, state: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "country") {
            let update = { ...user };
            update = { ...update, country: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "zipCode") {
            let update = { ...user };
            update = { ...update, zipCode: e.target.value }
            setUser(update);
        }
    }

    console.log("user",user);
    const getCartproducts = async () => {
        console.log("getCart Token", token);
        try {
            setLoader(true);
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
            console.log("cart Data", jsonData);
            setCartProduct([jsonData.data])
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    const placeOrder=async()=>{
        try{
            let getData= await fetch("https://academics.newtonschool.co/api/v1/ecommerce/order",
            {
                method: 'POST',
                headers: {
                    'projectID': 'zx5u429ht9oj',
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODNkMzZlYWVjOTkyMWMyOTVmNjg4NiIsImlhdCI6MTcwMzMyMzI1NSwiZXhwIjoxNzM0ODU5MjU1fQ.JM2QH4lDuFBmTLYKEb777cSa9pBZ4SU4ytEY55sA-5o`,
                },
                body: JSON.stringify({...user})
            })
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getCartproducts();
    }, [])
    return (
        <>
            <section className="addressMainbox">
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
                <div className="flex flex-row justify-center mt-10 w-fit m-auto addressAllBox">
                    <div className=" mr-9 addressDiv">
                        <li className=" text-left mb-6 font-semibold">SHIPPING DETAILS</li>
                        <form className=" flex flex-wrap gap-x-4 gap-y-5 addressFormBox">
                            <input onChange={UserAddressHandler} id="username" type="text" placeholder="Your Name*" />
                            <input onChange={UserAddressHandler} id="street" type="text" placeholder="Address (House No, Building,Street,Area)*" />
                            <input onChange={UserAddressHandler} id="city" type="text" placeholder="City/District*" />
                            <input onChange={UserAddressHandler} id="state" type="text" placeholder="State*" />
                            <input onChange={UserAddressHandler} id="country" type="text" placeholder="Country*" />
                            <input onChange={UserAddressHandler} id="pinCode" type="number" placeholder="Pin Code*" />
                        </form>
                    </div>

                    <div className=" bg-white py-8 productDetailsBox ">
                        {cartProduct?.map((val) => {
                            return (
                                <div className="px-8">
                                    <h1 className="py-2 mb-2 font-semibold flex borderBottom">PRODUCT DETAILS ({val.items.length} Items) </h1>
                                    <div className="flex flex-col gap-y-2 text-left mb-3 borderBottom">
                                        <p className=" flex justify-between">Total MRP(inc. of Taxes) <span>{val.totalPrice + 268}</span></p>
                                        <p className=" flex justify-between ">Discount <span>-268</span></p>
                                        <p className=" flex justify-between">Shipping <span className=" text-green-500 font-medium"><span className=" text-black text-sm line-through font-normal">₹49</span> Free</span></p>
                                        <p className=" flex justify-between mb-2">Cart Total <span>{val.totalPrice}</span></p>
                                    </div>
                                    <h2 className=" flex justify-between my-1">Total Amount <span>{val.totalPrice}</span></h2>
                                    <button className=" w-full py-3 text-white font-semibold mt-4 checkoutBtn">CHECKOUT SECURELY</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserAddress;