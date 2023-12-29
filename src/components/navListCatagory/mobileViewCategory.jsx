import { Link } from "react-router-dom";
import { mensCatagory, womenCatagory } from "../contants/constants";
import "./catagory.css";

const MobileViewCategory = (props) => {
    const { closeCategory,  closeFuncHandler, } = props;
    
    return (
        <div onClick={closeCategory} id="sidebar" className=" absolute z-30 top-0 backSideOfMobileCategory">
            <section id="sidebarCategory" className=" bg-white py-5 px-1 flex  flex-col overflow-y-scroll mobileCategoryMainBox">
                <h1 className=" mb-4 font-semibold">All Categories</h1>
                <div className=" mensCategoryBox">
                    <div className="flex  px-1 justify-between py-2 colorBox">
                        <span  className=" text-lg px-5  font-semibold">Mens</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                    </div>
                    <div id="allMens" className="flex px-5 flex-col text-left">
                        {mensCatagory.map((val, idx) => {
                            return (
                                <>
                                    {idx < 1 ?
                                        <>
                                            <div className=" pb-2">
                                                <h1 className=" font-semibold text-lg">{val.heading1}</h1>
                                                {val.list1.map((listItems) => {
                                                    return (
                                                        <Link to={`category/${listItems.id}/Men`}><p key={listItems.name}  id={listItems.id} className=" text-sm font-normal yellowText">{listItems.name}</p></Link>
                                                    )
                                                })}
                                            </div>
                                            <div className=" pb-2 listBox">
                                                <h1 className=" font-semibold text-lg">{val.heading2}</h1>
                                                {val.list2.map((listItems) => {
                                                    return (
                                                        <Link to={`category/${listItems.id}/Men`}><p  key={listItems.name} id={listItems.id} className=" text-sm font-normal yellowText">{listItems.name}</p></Link>
                                                    )
                                                })}
                                            </div>
                                        </>
                                        : ""}
                                </>
                            )
                        })}
                    </div>
                </div>
                <div className="womensCategoryBox">
                    <div className="flex justify-between py-2 colorBox">
                        <span className=" text-lg px-5 font-semibold">Womens</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                    </div>
                    <div className="flex px-5 flex-col text-left">
                        {womenCatagory.map((val, idx) => {
                            return (
                                <>
                                    {idx < 1 ?
                                        <>
                                            <div className=" pb-2">
                                                <h1 className=" font-semibold text-lg">{val.heading1}</h1>
                                                {val.list1.map((listItems) => {
                                                    return (
                                                        <Link to={`category/${listItems.id}/Women`} ><p  key={listItems.name} id={listItems.id} className=" text-sm font-normal yellowText">{listItems.name}</p></Link>
                                                    )
                                                })}
                                            </div>
                                            <div className=" pb-2 listBox">
                                                <h1 className=" font-semibold text-lg">{val.heading2}</h1>
                                                {val.list2.map((listItems) => {
                                                    return (
                                                        <Link to={`category/${listItems.id}/Women`}><p  key={listItems.name} id={listItems.id} className=" text-sm font-normal yellowText">{listItems.name}</p></Link>
                                                    )
                                                })}
                                            </div>
                                        </>
                                        : ""}
                                </>
                            )
                        })}
                    </div>
                </div>
                <div className="winterCategoryBox">
                    <div className="flex justify-between py-2 colorBox">
                        <span className=" text-lg px-5 font-semibold">Winter Collections</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                    </div>
                    <div className=" pb-2 px-5 listBox">
                    <Link to={`allProducts/sweater`}><p onClick={closeCategory} id="sweater" className=" text-sm text-left font-normal yellowText">Sweater</p></Link>
                    <Link to={`allProducts/hoodie`}><p onClick={closeCategory} id="hoodie" className=" text-sm text-left font-normal yellowText">Hoodies</p></Link>
                    </div>
                </div>
                <div className="newArrivalCategoryBox">
                    <div className="flex justify-between py-2 colorBox">
                        <span className=" text-lg px-5 font-semibold">New Arrivals</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                    </div>
                    <div className=" pb-2 px-5 listBox">
                        <Link to={"allProducts/T-shirt"} ><p onClick={closeCategory} id="sweater" className=" text-sm text-left font-normal yellowText">New Arrivals</p></Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MobileViewCategory;