import { useEffect, useState } from "react"
import { mensCatagory, womenCatagory } from "../contants/constants"
import "./catagory.css";
import { Link } from "react-router-dom";

const MenCatagory=(props)=>{
    const {status,clickHandler, categoryType,onMouseOverDropBox}=props;
    const [listInfo,setListInfo]=useState(mensCatagory);
    // const checkCategoryType=()=>{
    //     console.log("categoryType ",categoryType);
    //     if(categoryType==="men"){
    //         setListInfo(mensCatagory);
    //     }
    //     else if(categoryType==="women"){
    //         setListInfo(womenCatagory);
    //     }
    // }

    // useEffect(()=>{
    //     checkCategoryType();
    // },[categoryType]);
    return( 
        <div>
            <div className="dropBox"></div>
            
            <div style={{display:status}} className=" z-30 absolute flex justify-between posi py-4 px-6 main">
             {
                listInfo?.map((product)=>{
                    return(
                        <div>
                            <div className={product.classname}>
                                <h3 className="font-semibold text-lg mb-1">{product.heading1}</h3>
                                <div className="list">
                                    {product.list1?.map((val)=>{
                                        return <Link to={`category/${val.id}/${product.gender}`}><p onClick={clickHandler} className="listName text-sm my-2 font-semibold text-slate-800">{val.name}</p></Link>
                                    })}
                                </div>
                            </div>
                            <div className={product.classname}>
                                <h3 className="font-bold my-1">{product.heading2}</h3>
                                <div className="list">
                                    {product.list2?.map((val)=>{
                                        return <Link to={`category/${val.id}/${product.gender}`}><p onClick={clickHandler} className="font-semibold listName text-sm my-2 text-slate-800">{val.name}</p></Link>
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

export default MenCatagory;