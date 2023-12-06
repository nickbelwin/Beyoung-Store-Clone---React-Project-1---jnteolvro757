import { bigSavingZone } from "../contants/constants";
import "./bigSavingZone.css"

const BigSavingZone = () => {
    return (
        <div className="savingBox">
            {bigSavingZone?.map((val)=>{
            return(
                < >
                    {!val.image2? 
                    <div className={val.class} key={val.id1} id={val.id1}>
                        <img src={val.image1} alt="" />
                    </div>:
                    <div className={val.class}>
                        <div id={val.id1}>
                            <img src={val.image1} alt="" />
                        </div>
                        <div id={val.id2}>
                            <img src={val.image2} alt="" />
                        </div>
                    </div> }
                </>
            )
        })}
        </div>
    )
}

export default BigSavingZone;