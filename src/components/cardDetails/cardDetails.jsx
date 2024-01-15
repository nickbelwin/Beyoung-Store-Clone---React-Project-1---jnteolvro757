import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Markup } from "interweave";
import "./cardDetails.css"
import { AppContext } from "../../contextApi/AppContext";
import Loading from "../loading/loading";
import { firstnameReview, lastnameReview, reviewNameList } from "../contants/constants";

const CardDetails = (props) => {
    // const { addToCartHandler } = props;
    
    const { id } = useParams();
    console.log("id: ", id);
    const [product, setProduct] = useState("");
    const [review, setReview] = useState("");
    const [loader, setLoader] = useState(true);
    const [loader2, setLoader2] = useState(false);
    const [addedwithCartBtn, setAddedwithCartBtn] = useState(false);
    const [displayImg, setDisplayImg] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [totalReviews, setTotalReviews] = useState("");
    const [addToCartData, setAddToCartData]=useState({quantity : 1,size : ""});
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [sizeErrorMsg, setSizeErrorMsg] = useState("none");
    const { openLogin, token,setTotalCart,  setIsAdded } = useContext(AppContext);
    const navigate=useNavigate();
    const getProduct = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
                {
                    method: 'GET',

                    headers: { 'projectId': 'zx5u429ht9oj' }
                }
            );
            let data = await getData.json();
            setProduct([data.data]);
            setDisplayImg(data.data.displayImage);
            setLoader(false);
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
        console.log("setProduct 0:", product)
    }

    const patchCart = async () => {
        console.log("patchCart Token",token, "id: ",id);
        setLoader2(true);
        console.log(JSON.stringify({...addToCartData}))
        try {
            
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
                {
                    method: 'PATCH',
                    headers: { 'projectId': 'zx5u429ht9oj',
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' },
                    body: JSON.stringify({...addToCartData})
                }
            );
           if(getData.ok){
            let data = await getData.json();
            console.log("patch Data",data);
            getCartproducts();
            setIsAdded(true);
           }
           setLoader2(false);
        }
        catch (error) {
            console.log(error);
            alert("faild to cart");
            setLoader2(false);
        }
    }

    const addToCartHandler = () => {
        if (token ) {
            if(selectedQuantity && selectedSize){
                setSizeErrorMsg("none");
                console.log(selectedQuantity,selectedSize);
                patchCart();
            }
            else if(!selectedSize){
                setSizeErrorMsg("block");
            }
        }else{
            openLogin();
        }
    }
    useEffect(()=>{
        setAddToCartData({...addToCartData, quantity:selectedQuantity, size:selectedSize});
    },[selectedQuantity,selectedSize]);
    const buyNowHandler=()=>{
        if (token ) {
            if(selectedQuantity && selectedSize){
                setAddToCartData({...addToCartData, quantity:selectedQuantity, size:selectedSize});
                patchCart();
                navigate("/cart");
            }
            else if(!selectedQuantity){
                alert("please select quantity")
            }
            else if(!selectedSize){
                alert("please select size")
            }
        }else{
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
            setTotalCart(jsonData.data.items.length);
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log(addToCartData);
    
    const getProductReview = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`,
                {
                    method: 'GET',
                    headers: { 'projectId': 'zx5u429ht9oj' }
                }
            );
            let data = await getData.json();
            console.log("review: ", data.data);
            setReview(data.data);
            setLoader(false);
            let num = review?.length;
            console.log("num: ", num);
            setTotalReviews(parseFloat(num.toFixed(1)));
        }
        catch (error) {
            console.log(error);
            setLoader(false);
        }
        console.log("setProduct 0:", product)
    }

    const showImg = (e) => {
        setActiveSlideIndex(parseInt(e.target.id));
        setDisplayImg(product[0].images[e.target.id]);
    }
    const showNextPrevImg = () => {
        console.log("activeSlideIndex",activeSlideIndex);
        setDisplayImg(product[0].images[activeSlideIndex]);
    }
    const nextImg=()=>{
        console.log("activeSlideIndex",activeSlideIndex);
        if( activeSlideIndex < product[0].images.length-1){
            setActiveSlideIndex(activeSlideIndex+1);
            setDisplayImg(product[0].images[activeSlideIndex+1]);
           
        }
    }
    const prevImg=()=>{
        if( activeSlideIndex > 0){
            setActiveSlideIndex(activeSlideIndex-1);
            setDisplayImg(product[0].images[activeSlideIndex-1]);
        }
    }
    // useEffect(()=>{
    //     showNextPrevImg();
    // },[activeSlideIndex]);
    const checkSize = (e) => {
        let id = e.target.id;
        console.log(product);
        product[0].size?.forEach((val) => {
            document.getElementById(val).style.border = "2px solid black";
            document.getElementById(val).style.backgroundColor="white";
            document.getElementById(val).style.color="black";
        })
        document.getElementById(id).style.border = "2px solid blue";
        document.getElementById(id).style.backgroundColor="#B9BEC1";
        document.getElementById(id).style.color="black";
        setSizeErrorMsg("none");
        setSelectedSize(id);
    }
    const checkQuantity = (e) => {
        console.log(e.target.value);
        setSelectedQuantity(parseInt(e.target.value));
    }
    useEffect(() => {
        getProduct();
        getProductReview();
    }, [id]);
    return (
        <>
            {!loader ? Array.isArray(product) && product?.map((val) => {
                return (
                    <div id={val._id} key={val._id} className=" singleCard">
                        
                        <div className=" justify-center cardImage">
                            {/* Display Images */}
                            <div className="flex w-fit gap-x-2 justify-center flex-row p-4 displayImage">
                                <div className="flex flex-col overflow-y-scroll overflow-hidden gap-y-1 scrollImg" >
                                    {val.images?.map((val, index) => {
                                        return (
                                            <img onClick={showImg} id={index} className="w-28" src={val} alt="" />
                                        )
                                    })}
                                </div>
                                
                                    <img className="" src={displayImg} alt="" />
                                    <div onClick={prevImg} className=" absolute w-5  cardImgArrowL"><img src="/img/leftSide.png" alt="" /></div>
                                    <div onClick={nextImg} className=" absolute w-5  cardImgArrowR"><img src="/img/rightSide.png" alt="" /></div>
                               
                            </div>
                            {/* Product Details Box */}
                            <div className="w-2/5 p-4 flex flex-col gap-3 productDetailBox">
                                <p className="text-left text-xl font-semibold productDetailsName">{val.name}
                                    <p className="text-left text-slate-400 text-base">{val.subCategory}</p>
                                </p>

                                <p className=" text-left text-xl font-semibold">₹ {val.price}
                                    <p className="text-left text-slate-500 font-bold text-sm">Inclusive of All Taxes + Free Shipping</p></p>

                                <p className="flex align-middle text-xs font-semibold gap-2 "><img className="w-8" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ_ZRSlCDu_TPpI8LDW0Kc34LtYh1N1kCUnbO7mKFP1WU2s4VqG" alt="" /><p className="text-left mt-2.5">Extra ₹100 OFF on ₹999 (Code:BEYOUNG100)</p></p>
                                <div className="flex">
                                    <div className="flex mr-3">
                                        {[...Array(Math.floor(val.ratings))].map((val) => {
                                            console.log("img");
                                            return (
                                                <img className=" mb-1 mr-0.5 w-4" src="https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-like-32386.png" alt="" />
                                            )
                                        })}
                                    </div>
                                    <span className="mb-1">{Math.floor(val.ratings)} <span className="text-xs">{`(${review.length} Ratings & Reviews)`}</span></span>
                                </div>
                                <div>
                                    <p className="flex">COLOR : {val.color}</p>
                                    <div className="boxOfColor"><div style={{ backgroundColor: `${val.color}` }} className="colorofProduct"></div></div>
                                </div>
                                {/* selected size */}
                                <div className=" ">
                                    <p className="flex">SIZE</p>
                                    <div className="flex gap-4 mt-1 mb-1">
                                        {val.size?.map((val) => {
                                            return (
                                                <div onClick={checkSize} id={val} className="size">{val}</div>
                                            )
                                        })}
                                    </div>
                                    <p style={{display:sizeErrorMsg}} className=" text-left text-red-600">Please select size!!!</p>
                                </div>
                                {/* selected Quantity */}
                                <div className="w-fit my-2">
                                    <select onChange={checkQuantity} id="quantity">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="grid gap-2 cardDetailBtn ">
                                    <button onClick={addToCartHandler}  className="bg-sky-400 py-4 justify-center relative font-semibold text-base cartbtn "><img src="https://www.beyoung.in/desktop/images/product-details-2/cart.svg" alt="" />ADD<span className="text-sky-400">_</span>TO<span className="text-sky-400">_</span>CART</button>
                                    <button onClick={buyNowHandler} className="flex justify-center bg-yellow-400 font-semibold buybtn"><img src="https://www.beyoung.in/desktop/images/product-details-2/arrow-right.svg" alt="" />BUY<span className="text-yellow-400">_</span>NOW</button>
                                </div>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="m-3">
                            <p className="w-fit font-bold text-2xl my-4">Product Description</p>
                            <p id="discrip" className="p-4 productDescription"> <Markup content={val.description} /> </p>
                        </div>

                        {/* Review Box */}
                        <div className="reviewBox">
                            <p className="w-fit font-bold text-2xl mt-10 ml-3">Ratings & Reviews</p>
                            <div className="review">
                                <div>
                                    {Array.isArray(review) && review?.map((val) => {

                                    })}
                                </div>
                                <div className="m-3 pb-3 customerReviewBox">
                                    <div className="w-fit font-bold mb-4 p-5 ml-2">Hear What Our Customers Say</div>
                                    {Array.isArray(review) && review?.map((val, idx) => {
                                        return (
                                            <>
                                                {idx < 5 ? <div className="mx-8 mb-10 customerReview">
                                                    <p className=" text-left font-medium">{firstnameReview[Math.floor(Math.random() * firstnameReview.length)]} {lastnameReview[Math.floor(Math.random() * lastnameReview.length)]}</p>
                                                    <div className="flex w-6">
                                                        {[...Array(val.ratings)].map((val) => {
                                                            console.log("img");
                                                            return (
                                                                <img className="mb-1 w-4" src="https://w7.pngwing.com/pngs/614/927/png-transparent-star-silhouette-shape-black-star.png" alt="" />
                                                            )
                                                        })}
                                                    </div>
                                                    <div>
                                                        <p className="w-fit text-sm mb-5">{val.text}</p>
                                                    </div>
                                                </div> : ""}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>


                    </div>
                )
            }) : <Loading/>}
        </>
    )
}

export default CardDetails;