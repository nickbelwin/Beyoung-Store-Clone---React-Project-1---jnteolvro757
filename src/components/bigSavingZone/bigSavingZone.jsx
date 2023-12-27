import { useNavigate } from "react-router-dom";
import { bigSavingZone } from "../contants/constants";
import "./bigSavingZone.css";
import { useEffect, useState } from "react";

const BigSavingZone = (props) => {
    const { bigSavingZoneHandler } = props;
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [bigSavingProducts, setBigSavingProducts] = useState(bigSavingZone);
    const prevImg = () => {
        if (activeSlideIndex > 0) {
            setActiveSlideIndex(activeSlideIndex - 1);
        }

    }
    const nextImg = () => {
        if (activeSlideIndex < bigSavingZone.length - 1) {
            setActiveSlideIndex(activeSlideIndex + 1);
        }
    }

    // useEffect(() => {
    //     setBigSavingProducts(bigSavingZone);
    //     console.log("activeSlideIndex", activeSlideIndex)
    // }, [activeSlideIndex]);
    return (
        <div className=" relative">
            <div onClick={prevImg} className=" bg-white p-1 border absolute cursor-pointer leftArrow">{`<`}</div>
            <div onClick={nextImg} className="bg-white p-1 border absolute cursor-pointer rightArrow">{`>`}</div>
            <div className="mb-6">
                <p className="w-fit text-xl font-semibold pl-3 bigSavingZoneTag">BIG SAVING ZONE</p>
            </div>

            <div className=" savingBox">

                {bigSavingProducts?.map((val, idx) => {
                    return (
                        < >{idx >= activeSlideIndex ? !val.image2 ?
                            <div className="mr-6 w-fit" key={val.id1}>
                                <div className={`cursor-pointer ${val.class}`}>
                                    <img onClick={bigSavingZoneHandler} id={val.id1} src={val.image1} alt="" />
                                </div>
                            </div> :
                            <div className="mr-3 w-fit" key={val.id1}>
                                <div className={val.class}>
                                    <img onClick={bigSavingZoneHandler} className="cursor-pointer savingDualBox1" id={val.id1} src={val.image1} alt="" />
                                    <img onClick={bigSavingZoneHandler} className="cursor-pointer savingDualBox2" id={val.id2} src={val.image2} alt="" />
                                </div>
                            </div> : ""}

                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default BigSavingZone;