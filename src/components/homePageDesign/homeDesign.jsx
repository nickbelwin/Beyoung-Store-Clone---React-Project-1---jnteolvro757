import { useEffect, useState } from "react"
import { products } from "../contants/constants";
// import fetch from "node-fetch";
import "./homeDesign.css"
import { Link, redirect, useNavigate } from "react-router-dom";
const HomeDesign=(props)=>{
    const {showCard="flex"}=props;
    const navigate= useNavigate();
    const [loader, setLoader]= useState(true);
    const [product, setProduct]=useState([]);
    console.log(product);
    // const body= {a:1};
    const getAllProducts=async()=>{
        try{
            setLoader(true);
            let getData= await fetch("https://academics.newtonschool.co/api/v1/ecommerce/clothes/products", 
        {method: 'GET',
        // body: JSON.stringify(body),
        headers: {'projectId': 'zx5u429ht9oj'}
        }
        );
        let data= await getData.json();
        setProduct(data.data);
        setLoader(false);
        }
        catch(error){
            console.log(error);
            setLoader(false);
        }
        console.log("setProduct 0:", product )
    }
    useEffect(()=>{
        getAllProducts();
    },[]);
    const linkHandler=(e)=>{
        e.stopPropagation();
        console.log("product: ",e.target.parentNode.id);
        navigate(`/product-details/${e.target.parentNode.id}`);
    }
    return(
            <div style={{display:"flex "}} className="cardBox">
                {!loader? product?.map((val)=>{
                    return(
                        <div onClick={linkHandler} key={val._id}>
                            <div className="card" id={val._id}>
                                {val.displayImage? <img className="image rounded-md" src={val.displayImage} alt="" /> : <img src="https://www.beyoung.in/beyoung-loader.gif"/>}
                                <span className="cardName w-fit text-slate-700 font-semibold">{val.name}</span>
                                <span className="w-fit text-gray-400 text-sm">{val.subCategory}</span>
                                <p className="w-fit mt-2">₹{val.price}</p>
                            </div>
                        </div>
                    )
                }): <img className="loading" src="https://www.beyoung.in/beyoung-loader.gif"/> }
            </div>
    
    )
}

export default HomeDesign;