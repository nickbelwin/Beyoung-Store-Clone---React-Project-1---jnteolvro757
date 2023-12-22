import { forMenTshirt } from "../contants/constants";
import "./forMenTshirt.css"

const ForMenTshirt = () => {
    return (
        <>
            <p className=" text-left mt-12 text-2xl font-semibold pl-4 shirtTag">T-SHIRTS</p>
            <p className=" text-left ml-5 mb-3">High On Demand</p>
            <div className="flex overflow-x-scroll">
                <div className="mr-6">
                    <div className=" bigImg">
                        <img src="https://www.beyoung.in/api/catalog/homepage-3-10/T-shirt-section/new/9.jpg" alt="" />
                    </div>
                </div>
                <div>
                    <div className="flex">
                        {forMenTshirt?.map((val, idx) => {
                            return (
                                <div className="mr-6" key={val.name1}>
                                    <div className="smallImg">
                                        <span><img className="cursor-pointer mb-3 savingDualBox1" id={val.id1} src={val.image1} alt="" /><span></span></span>
                                        <img className="cursor-pointer mb-3 savingDualBox2" id={val.id2} src={val.image2} alt="" />
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