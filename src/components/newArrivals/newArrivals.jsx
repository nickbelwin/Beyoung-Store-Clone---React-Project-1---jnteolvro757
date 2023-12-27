import { useNavigate } from "react-router-dom";
import { newArrivals } from "../contants/constants";
import "./newArrivals.css";
import { useState } from "react";

const NewArrivals = () => {
    const navigate=useNavigate();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [newArrivalsProducts, setNewArrivalsProducts] = useState(newArrivals);

    const prevImg = () => {
        if (activeSlideIndex > 0) {
            setActiveSlideIndex(activeSlideIndex - 1);
        }

    }
    const nextImg = () => {
        if (activeSlideIndex < newArrivalsProducts.length - 3) {
            setActiveSlideIndex(activeSlideIndex + 1);
        }
    }


    const newArrivalsHandler=(e)=>{
        e.stopPropagation();
        navigate(`/category/${e.target.parentNode.id}/Men`);

    }

    return (
        <div className=" relative">
            <div onClick={prevImg} className=" bg-white p-1 border absolute cursor-pointer z-10 leftArrow">{`<`}</div>
            <div onClick={nextImg} className="bg-white p-1 border absolute cursor-pointer z-10 rightArrow">{`>`}</div>
            <div className="mb-7">
                <p className="w-fit pl-3 font-semibold text-xl newArrivalTag">NEW ARRIVALS</p>
            </div>
            <div className="flex overflow-x-auto h-auto newArrivalBox">
                {newArrivalsProducts?.map((val,idx) => {
                    return (
                        <>{idx >= activeSlideIndex ? <div key={val.name} className="mr-9">
                        <div className="w-64 relative cursor-pointer newArrivalBox" onClick={newArrivalsHandler} id={val.id}>
                            <img className="rounded-lg" src={val.image} alt="" />
                            <p className="newArrivalName">{val.name}</p>
                        </div>
                    </div>:""}
                        </>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default NewArrivals;