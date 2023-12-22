import { useEffect, useState } from "react"
import { mensCatagory, womenCatagory } from "../contants/constants"
import "./catagory.css";
import { Link } from "react-router-dom";

const WomenCatagory=(props)=>{
    const {status2,clickHandler, categoryType}=props;
    const [listInfo,setListInfo]=useState(womenCatagory);
    
    return( 
        <div>
           
            <div className="dropBox2"></div>
            <div style={{display:status2}} className="z-10 absolute flex justify-between posi2 py-4 px-6 main">
             {
                listInfo?.map((val)=>{
                    return(
                        <div>
                            <div className={val.classname}>
                                <h3 className="font-semibold text-lg mb-1">{val.heading1}</h3>
                                <div className="list">
                                    {val.list1?.map((val)=>{
                                        return <Link to={`category/${val.id}/Women`}><p onClick={clickHandler} className="listName text-sm my-2 font-semibold text-slate-800">{val.name}</p></Link>
                                    })}
                                </div>
                            </div>
                            <div className={val.classname}>
                                <h3 className="font-bold my-1">{val.heading2}</h3>
                                <div className="list">
                                    {val.list2?.map((val)=>{
                                        return <Link to={`category/${val.id}/Women`}><p onClick={clickHandler} className="font-semibold listName text-sm my-2 text-slate-800">{val.name}</p></Link>
                                    })}
                                </div>
                            </div>
                            
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default WomenCatagory;