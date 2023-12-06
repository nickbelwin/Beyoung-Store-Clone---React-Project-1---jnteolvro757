import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./cardDetails.css"

const CardDetails = () => {
    const { id } = useParams();
    console.log("id: ", id);
    const [product, setProduct] = useState("");
    const [loader, setLoader] = useState(true);
    const [displayImg, setDisplayImg] = useState("");
    const getProduct = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
                {
                    method: 'GET',
                    // body: JSON.stringify(body),
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
    const showImg = (e) => {
        setDisplayImg(product[0].images[e.target.id]);
    }
    const checkSize=(e)=>{
        let id=e.target.id;
        console.log(product);
        product[0].size?.forEach((val)=>{
            document.getElementById(val).style.border="2px solid black";
        })
        document.getElementById(id).style.border="2px solid blue";
    }
    useEffect(() => {
        getProduct();
    }, [id]);
    return (
        <div>
            {!loader ? Array.isArray(product) && product?.map((val) => {
                return (
                    <div id={val._id} key={val._id} className="singleCard">
                        <div className="flex justify-center cardImage">
                            <div className="flex w-fit gap-x-2 flex-row p-4">
                                <div className="flex flex-col overflow-y-scroll overflow-hidden gap-y-1 scrollImg" >
                                    {val.images?.map((val, index) => {
                                        return (
                                            <img onClick={showImg} id={index} className="w-28" src={val} alt="" />
                                        )
                                    })}
                                </div>
                                <img className="displayImage" src={displayImg} alt="" />
                            </div>
                            <div className="w-2/5 p-4 flex flex-col gap-6">
                                <p className="w-fit text-xl font-semibold">{val.name}
                                    <p className="w-fit text-slate-400 text-base">{val.subCategory}</p>
                                </p>

                                <p className="text-start w-fit text-xl font-semibold">₹ {val.price}
                                    <p className=" w-fit text-slate-500 font-bold text-sm">Inclusive of All Taxes + Free Shipping</p></p>

                                <p className="flex align-middle text-xs font-semibold gap-2 "><img className="w-8" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ_ZRSlCDu_TPpI8LDW0Kc34LtYh1N1kCUnbO7mKFP1WU2s4VqG" alt="" /><p className="mt-2.5">Extra ₹100 OFF on ₹999 (Code:BEYOUNG100)</p></p>
                                <div>
                                <p className="flex">COLOR : {val.color}</p>
                                <div className="boxOfColor"><div style={{backgroundColor:`${val.color}`}} className="colorofProduct"></div></div>
                                </div>
                                <div>
                                    <p className="flex">SIZE</p>
                                    <div className="flex gap-4 mt-4">
                                        {val.size?.map((val) => {
                                            return (
                                                <div onClick={checkSize} id={val} className="size">{val}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-5 mt-10">
                                    <button className="bg-sky-400 cartbtn "><img src="https://www.beyoung.in/desktop/images/product-details-2/cart.svg" alt="" />ADD TO CART</button>
                                    <button className="flex bg-yellow-400 byebtn"><img src="https://www.beyoung.in/desktop/images/product-details-2/arrow-right.svg" alt="" />BYE NOW</button>
                                </div>
                            </div>
                        </div>
                        <p>{val.description}</p>


                    </div>
                )
            }) : <img className="loading" src="https://www.beyoung.in/beyoung-loader.gif" />}
        </div>
    )
}

export default CardDetails;