import Header from "../header/header"
import { Link } from "react-router-dom";
import "./cart.css";
import { useContext, useEffect, useState } from "react";
import isAuth from "../../isAuth/isAuth";
import { AppContext } from "../../contextApi/AppContext";
const Cart = () => {
    const [product, setProduct] = useState([]);
    const [loader, setLoader] = useState(true);
    const { isLogout, openLogin, token } = useContext(AppContext);
    const getCartproducts = async () => {

        console.log("getCart Token", token);
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`,
                {
                    method: 'GET',
                    Authorization: `Bearer${token}`,
                    headers: { 'projectID': 'zx5u429ht9oj'},
                }
            );
            let data = await getData.json();
            console.log("cart Data", data);
            setProduct([data.data]);
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    console.log(product);

    useEffect(() => {
        getCartproducts()
    }, []);

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
                <div className=" mt-10">
                    <div className="flex flex-wrap justify-center w-fit m-auto">
                        <div className=" productDiv w-fit overflow-y-scroll">
                            {product?.map((val) => {
                                return (
                                    <>
                                        {/* <div className="flex w-fit flex-col bg-white p-5">
                                            <div className="flex mb-4">
                                                <div className="cartImage">
                                                    <img className="" src={val.displayImage} alt="" />
                                                </div>
                                                <div className="flex flex-col gap-3 ">
                                                    <p className=" w-fit text-left">{val.name}</p>
                                                    <p className=" w-fit text-left">{val.subCategory}</p>
                                                    <p className="text-start w-fit text-xl font-semibold">₹ {val.price}</p>
                                                    <p className=" flex justify-between  text-left">Color: {val.color} <p className=" w-fit text-left">Size: {val.size[0]}</p></p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <button className=" my-2 removeBtn">REMOVE</button>
                                                <button className=" my-2 w-full moveToFovoritesBtn">MOVE TO FAVORITES</button>
                                            </div>
                                        </div> */}

                                    </>
                                )
                            })}
                        </div>
                        <div className=" bg-white py-8 productDetailsBox ">
                            <div className="px-8">
                                <h1 className="py-2 mb-2 font-semibold flex borderBottom">PRODUCT DETAILS (3 Items) </h1>
                                <div className="flex flex-col gap-y-1 text-left mb-3 borderBottom">
                                    <p className=" flex justify-between">Total MRP(inc. of Taxes) <span>599</span></p>
                                    <p className=" flex justify-between">Shipping <span className=" text-green-500 font-medium">Free</span></p>
                                    <p className=" flex justify-between mb-2">Cart Total <span>599</span></p>
                                </div>
                                <h2 className=" flex justify-between my-1">Total Amount <span>599</span></h2>
                                <button className=" w-full py-3 text-white font-semibold mt-4 checkoutBtn">CHECKOUT SECURELY</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </section>
    )
}

export default isAuth(Cart);

// brand
// :
// "Bewakoof®"
// category
// :
// "clothes"
// color
// :
// "PURPLE"
// createdAt
// :
// "2023-10-07T09:50:49.758Z"
// description
// :
// "Feeling Nenless in your style game? No Problem, this Hunter X Hunter Men's Regular T-Shirt got you! Team this purple t-shirt with denim shorts and trainer shoes for an enhanced appeal.<br><b style=\"font-family: montserrat-bold, sans-serif\"> Country of Origin - </b>India<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Manufactured By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Packed By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Commodity - </b>Men's T-Shirt<br>"
// displayImage
// :
// "https://images.bewakoof.com/t1080/men-s-purple-hunter-x-hunter-graphic-printed-t-shirt-591081-1694762671-1.jpg"
// fabric
// :
// null
// features
// :
// []
// gender
// :
// "Men"
// images
// :
// (5)['https://images.bewakoof.com/t1080/men-s-purple-hun…r-graphic-printed-t-shirt-591081-1694762676-2.jpg', 'https://images.bewakoof.com/t1080/men-s-purple-hun…r-graphic-printed-t-shirt-591081-1694762682-3.jpg', 'https://images.bewakoof.com/t1080/men-s-purple-hun…r-graphic-printed-t-shirt-591081-1694762687-4.jpg', 'https://images.bewakoof.com/t1080/men-s-purple-hun…r-graphic-printed-t-shirt-591081-1694762693-5.jpg', 'https://images.bewakoof.com/t1080/men-s-purple-hun…r-graphic-printed-t-shirt-591081-1694762698-6.jpg']
// name
// :
// "Men's Purple Hunter X Hunter Graphic Printed T-shirt"
// price
// :
// 399
// ratings
// :
// 3.2222222222222223
// reviews
// :
// []
// seller
// :
// { name: 'Bewakoof®' }
// sellerTag
// :
// "best seller"
// size
// :
// (4)['S', 'M', 'L', 'XL']
// subCategory
// :
// "tshirt"
// theme
// :
// null
// type
// :
// null
// videos
// :
// []
// __v
// :
// 0
// _id
// :
// "652675cddaf00355a783837a"