import { useNavigate } from "react-router-dom";
import "./forWomen.css";
import { useState } from "react";
import { forWomen } from "../contants/constants";

const ForWomen=()=>{
    const navigate=useNavigate();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [newArrivalsProducts, setNewArrivalsProducts] = useState(forWomen);

    const prevImg = () => {
        if (activeSlideIndex > 0) {
            setActiveSlideIndex(activeSlideIndex - 1);
        }

    }
    const nextImg = () => {
        if (activeSlideIndex < newArrivalsProducts.length - 4) {
            setActiveSlideIndex(activeSlideIndex + 1);
        }
    }
    const newArrivalsHandler=(e)=>{
        e.stopPropagation();
        navigate(`/category/${e.target.parentNode.id}/Women`);

    }
    return(
        <div className=" relative">
           <img onClick={prevImg} className="  absolute z-10 leftArrow" src="/img/previousBtn.png" alt="" />
            <img onClick={nextImg} className="  absolute z-10 rightArrow" src="/img/nextBtn.png" alt="" />
            <div className="mb-7">
                <p className="w-fit pl-3 font-semibold text-xl newArrivalTag">NEW FOR WOMENS</p>
            </div>
            <div className="flex overflow-x-auto h-auto newArrivalBox">
                {newArrivalsProducts?.map((val,idx) => {
                    return (
                        <>{idx >= activeSlideIndex ? <div key={val.name} className="mr-9">
                        <div className=" relative cursor-pointer newArrivalBoxImg" onClick={newArrivalsHandler} id={val.id}>
                            <img className="rounded-lg" src={val.image} alt="" />
                            <p className="forWomenName">{val.name}</p>
                        </div>
                    </div>:""}
                        </>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default ForWomen;