import { useState } from "react"
import { mensCatagory } from "../contants/constants"
import "./menCatagory.css";
import { Link } from "react-router-dom";

const MenCatagory=(props)=>{
    const {status,clickHandler}=props;
    const [listInfo,setListInfo]=useState(mensCatagory);
    return(
        <main style={{display:status}} className="z-10 absolute flex justify-between posi p-2 main">
             {
                listInfo?.map((val)=>{
                    return(
                        <div>
                            <div className={val.classname}>
                                <h3 className="font-semibold text-lg my-4">{val.heading1}</h3>
                                <div className="list">
                                    {val.list1?.map((val)=>{
                                        return <Link to="menproducts"><p onClick={clickHandler} className="listName text-sm my-2 font-light">{val}</p></Link>
                                    })}
                                </div>
                            </div>
                            <div className={val.classname}>
                                <h3 className="font-bold my-4">{val.heading2}</h3>
                                <div className="list">
                                    {val.list2?.map((val)=>{
                                        return <p>{val}</p>
                                    })}
                                </div>
                            </div>
                            <>
                            {val.heading3? <div className={val.classname}>
                                <h3 className="font-bold my-4">{val.heading3}</h3>
                                <div className="list">
                                    {val.list3?.map((val)=>{
                                        return <p>{val}</p>
                                    })}
                                </div>
                            </div>: ""}
                            </>
                            <>
                            {val.heading4? <div className={val.classname}>
                                <h3>{val.heading4}</h3>
                                <div className="list">
                                    {val.list4?.map((val)=>{
                                        return <p>{val}</p>
                                    })}
                                </div>
                            </div>: ""}
                            </>
                        </div>
                    )
                })
            }
        </main>
    )
}

export default MenCatagory;