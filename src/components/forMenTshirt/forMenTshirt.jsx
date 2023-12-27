import { useNavigate } from "react-router-dom";
import { forMenTshirt } from "../contants/constants";
import "./forMenTshirt.css"

const ForMenTshirt = () => {
    const navigate=useNavigate();
    const goToAllProducts=(e)=>{
        e.stopPropagation();
        navigate(`category/${e.target.id}/Men`);
    }

    return (
        <>
            <p className=" text-left mt-12 text-2xl font-semibold pl-4 shirtTag">T-SHIRTS</p>
            <p className=" text-left ml-5 mb-3">High On Demand</p>
            <div className="flex overflow-x-scroll">
                <div className="mr-6">
                    <div className=" cursor-pointer bigImg">
                        <img onClick={goToAllProducts} id="T-shirt" src="https://www.beyoung.in/api/catalog/homepage-3-10/T-shirt-section/new/9.jpg" alt="" />
                    </div>
                </div>
                <div>
                    <div className="flex">
                        {forMenTshirt?.map((val, idx) => {
                            return (
                                <div className="mr-6" key={val.name1}>
                                    <div className="smallImg">
                                        <span className=" relative"><img onClick={goToAllProducts} className="cursor-pointer mb-3 savingDualBox1" id={val.id1} src={val.image1} alt="" /><span className=" absolute z-10 bottom-3 pl-3 nameTagOfMenTshirt">{val.name1}</span></span>
                                        <span className=" relative"><img onClick={goToAllProducts} className="cursor-pointer mb-3 savingDualBox2" id={val.id2} src={val.image2} alt="" /><span className=" absolute z-10 bottom-3 pl-3 nameTagOfMenTshirt">{val.name2}</span></span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForMenTshirt;