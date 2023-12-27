import { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contextApi/AppContext";
import Loading from "../loading/loading";

const Wishlist=()=>{
    const [loader, setLoader] = useState(true);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const navigate=useNavigate();
    const {token}=useContext(AppContext);

    const getWishlistProducts= async()=>{
        try{
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,
                {
                    method: 'GET',
                    headers: { 'projectId': 'zx5u429ht9oj',
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODNkMzZlYWVjOTkyMWMyOTVmNjg4NiIsImlhdCI6MTcwMzMyMzI1NSwiZXhwIjoxNzM0ODU5MjU1fQ.JM2QH4lDuFBmTLYKEb777cSa9pBZ4SU4ytEY55sA-5o`,},
                }
            );
            let jsonData = await getData.json();
            let cartItem= jsonData.data.items;
            setFavoriteItems(cartItem);
            console.log("wishlist",cartItem);
        }
        catch(error){
            console.log("ERROR",error);
        }
        console.log(favoriteItems);
    }
    const linkHandler = (e) => {
        e.stopPropagation();
        navigate(`/product-details/${e.target.parentNode.id}`);
    }

    useEffect(()=>{
        getWishlistProducts()
    },[]);


    return(<>
            <section className="flex justify-center wishlistMainBox">
                <div className="flex flex-wrap gap-5 ">
                {favoriteItems?.map((val)=>{
                    return(
                        <div onClick={linkHandler} key={val.products._id} className=" cursor-pointer">
                            <div className=" relative card" id={val.products._id}>
                                {/* <div class="absolute right-2 bottom-1 wrapper" id={val._id} >
                                    {wishlistProducts.includes(val._id)? <div class="icon-wishlist in-wishlist" id={val._id+1} onClick={favoriteIconFunc} ></div>:<div class="icon-wishlist" id={val._id+1} onClick={favoriteIconFunc} ></div>}
                                </div> */}
                                {val.products.displayImage ? <img className="image rounded-md" src={val.products.displayImage} alt="" /> : <Loading/>}
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
            </section>
    </>)
}

export default Wishlist;