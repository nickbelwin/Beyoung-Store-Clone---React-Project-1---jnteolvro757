import { useNavigate } from "react-router-dom";
import { bigSavingZone } from "../contants/constants";
import "./bigSavingZone.css"

const BigSavingZone = (props) => {
    const {bigSavingZoneHandler}=props;
    return (
        <div>
            <div className="mb-6">
                <p className="w-fit text-xl font-semibold pl-3 bigSavingZoneTag">BIG SAVING ZONE</p>
            </div>
            <div className="savingBox">
            {bigSavingZone?.map((val)=>{
            return( 
                < >
                    {!val.image2? 
                    <div className="mr-6" key={val.id1}>
                        <div className={`cursor-pointer ${val.class}`}>
                            <img onClick={bigSavingZoneHandler} id={val.id1} src={val.image1} alt="" />
                        </div>
                    </div> :
                    <div className="mr-3" key={val.id1}>
                        <div className={val.class}>
                            <img onClick={bigSavingZoneHandler} className="cursor-pointer savingDualBox1" id={val.id1} src={val.image1} alt="" />
                            <img onClick={bigSavingZoneHandler} className="cursor-pointer savingDualBox2" id={val.id2} src={val.image2} alt="" />
                        </div>
                    </div> }
                </>
            )
        })}
            </div>
        </div>
    )
}

export default BigSavingZone;