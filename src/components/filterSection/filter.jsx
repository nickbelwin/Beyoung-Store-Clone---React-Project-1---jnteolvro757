import "./filter.css";

const Filter = (props) => {
    const { productInfo, allColors, allSizes, closeFuncHandler, selectedColor, selectedSize } = props;

    const openFilter=()=>{
        document.getElementById("mobileFilter").style.transform="translateX(0rem)";
    }
    const closeFilter=()=>{
        document.getElementById("mobileFilter").style.transform="translateX(-100rem)";
    }

    return (
        <>
            <section className=" filterBox">
                <div className="mt-5 filter">
                    <p className=" text-left font-semibold text-lg bottomDotted">FILTER</p>
                    <div className=" ">
                        <div className="flex justify-between py-3 colorBox">
                            <span>COLOR</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                        </div>
                        <div id="allColors" className="flex flex-wrap gap-2 pb-4 bottomDotted">
                            {allColors?.map((val) => {
                                return (
                                    <div onClick={selectedColor} id={val} key={val} className="colorContainer">
                                        <div id={val} style={{ background: val }} className="color"></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between  py-3 colorBox ">
                            <span>SIZE</span><span id="size" onClick={closeFuncHandler}><img className="w-4 sizeArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                        </div>
                        <div id="allSizes" className="flex flex-col gap-2 pb-4 bottomDotted">
                            {allSizes?.map((val) => {
                                return (
                                    <div className="w-fit p-1 text-left cursor-pointer sizeContainer" id={val} onClick={selectedSize}>{val}</div>

                                )
                            })}
                        </div>
                    </div>

                </div>
            </section>
            <section className="mobileFilterBox">
                <p onClick={openFilter} className=" fixed z-10 left-5 bg-white text-xl font-semibold rounded-md px-2 cursor-pointer mobileFilterBtn">Filter</p>
                <div id="mobileFilter"  className="bg-white mt-5 px-5 filter">
                    <p onClick={closeFilter}  className="flex mb-10 text-lg cursor-pointer font-semibold">Close</p>
                    <p className=" text-left font-semibold text-lg bottomDotted">FILTER</p>
                    <div className=" ">
                        <div className="flex justify-between py-3 colorBox">
                            <span>COLOR</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                        </div>
                        <div id="allColors" className="flex flex-wrap gap-2 pb-4 bottomDotted">
                            {allColors?.map((val) => {
                                return (
                                    <div onClick={selectedColor} id={val} key={val} className="colorContainer">
                                        <div onClick={closeFilter} id={val} style={{ background: val }} className="color"></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between  py-3 colorBox ">
                            <span>SIZE</span><span id="size" onClick={closeFuncHandler}><img className="w-4 sizeArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                        </div>
                        <div id="allSizes" onClick={closeFilter} className="flex flex-col gap-2 pb-4 bottomDotted">
                            {allSizes?.map((val) => {
                                return (
                                    <div  className="w-full p-1 text-left cursor-pointer sizeContainer" id={val} onClick={selectedSize}>{val}</div>

                                )
                            })}
                        </div>
                    </div>

            </div>
            </section>
            
        </>
    )
}

export default Filter;