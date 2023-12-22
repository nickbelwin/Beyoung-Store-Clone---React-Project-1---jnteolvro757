import { useNavigate } from "react-router-dom";
import { newArrivals } from "../contants/constants";
import "./newArrivals.css";

const NewArrivals = () => {
    const navigate=useNavigate();
    const newArrivalsHandler=(e)=>{
        e.stopPropagation();
        navigate(`/category/${e.target.parentNode.id}/Men`);

    }

    return (
        <div>
            <div className="mb-7">
                <p className="w-fit pl-3 font-semibold text-xl newArrivalTag">NEW ARRIVALS</p>
            </div>
            <div className="flex overflow-x-auto h-auto newArrivalBox">
                {newArrivals?.map((val) => {
                    return (
                        <div key={val.name} className="mr-9">
                            <div className="w-64 relative cursor-pointer" onClick={newArrivalsHandler} id={val.id}>
                                <img className="rounded-lg" src={val.image} alt="" />
                                <p className="newArrivalName">{val.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewArrivals;