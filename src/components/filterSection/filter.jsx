import { useEffect } from "react";
import "./filter.css";

const Filter = (props) => {
    const { allColors, allSizes, closeFuncHandler, checkboxHandler, selectedColor, selectedSize, closeFilter } = props;

    const openFilter = () => {
        document.getElementById("mobileFilterCover").style.transform = "translateX(0rem)";
    }
    const isSticky = (e) => {
        const filter = document.getElementById('filterSection');
        const mobileFilter = document.getElementById("filterBtn");
        const scrollTop = window.scrollY;
        scrollTop >= 80 ? filter.classList.add('stickyFilter') : filter.classList.remove('stickyFilter');
        scrollTop >= 80 ? mobileFilter.classList.add('stickyMobileFilter') : mobileFilter.classList.remove('stickyMobileFilter');
        const sticky = document.querySelector('.stickyFilter');
    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    return (
        <>
            <section className=" pr-5 mt-2 filterBox">
                <div id="filterSection" className=" pr-3">
                    <p className=" text-left font-semibold text-lg bottomDotted">FILTER</p>
                    <div className=" ">
                        <div className="flex justify-between py-3 colorBox">
                            <span>COLOR</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer" id="colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
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
                            <span>SIZE</span><span id="size" onClick={closeFuncHandler}><img className="w-4 cursor-pointer sizeArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                        </div>
                        <div id="allSizes" className="flex flex-col gap-2 pb-4 bottomDotted">
                            {allSizes?.map((val) => {
                                return (
                                    <div className="w-fit p-1 text-left cursor-pointer sizeContainer" id={val} onClick={selectedSize}>{val}</div>

                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between  py-3 colorBox ">
                            <span className=" font-semibold">SORTING</span>
                        </div>
                        <div className="  text-left pb-3 bottomDotted">
                            <input className=" cursor-pointer mr-2" onClick={() => { checkboxHandler("lth") }} id="lth" type="checkbox" />
                            <span className=" cursor-pointer" onClick={() => { checkboxHandler("lth") }}>Low to high</span><br />
                            <input className=" cursor-pointer mr-2" onClick={() => { checkboxHandler("htl") }} id="htl" type="checkbox" />
                            <span className=" cursor-pointer" onClick={() => { checkboxHandler("htl") }}>High to low</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mobileFilterBox relative">
                <p onClick={openFilter} id="filterBtn" className=" fixed z-10 left-5 bg-white text-xl font-semibold rounded-md px-2 cursor-pointer mobileFilterBtn">Filter</p>
                <div onClick={closeFilter} id="mobileFilterCover" className=" fixed top-0 left-0 z-20">
                    <div id="mobileFilter" className="bg-white px-5 filter">
                        <p onClick={closeFilter} className="flex mb-1 text-lg cursor-pointer font-semibold">Close</p>
                        <div className=" overflow-y-scroll allFiltersMobile">
                            <p className=" text-left font-semibold text-lg ">FILTER</p>
                            <div className=" ">
                                <div className="flex justify-between py-1 mb-2 colorBox">
                                    <span>COLOR</span><span id="color" onClick={closeFuncHandler}><img className="w-4 cursor-pointer colorArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                                </div>
                                <div id="allColors" className="flex flex-wrap gap-2 pb-4 ">
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
                                <div className="flex justify-between mt-1 py-1 colorBox ">
                                    <span>SIZE</span><span id="size" onClick={closeFuncHandler}><img className="w-4 sizeArrow" src="https://www.beyoung.in/desktop/images/category/arrow.svg" alt="" /></span>
                                </div>
                                <div id="allSizes" onClick={closeFilter} className="flex flex-col gap-2 pb-4 bottomDotted">
                                    {allSizes?.map((val) => {
                                        return (
                                            <div className="w-full p-1 text-left cursor-pointer sizeContainer" id={val} onClick={selectedSize}>{val}</div>

                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between  py-3 colorBox ">
                                    <span className=" font-semibold">SORTING</span>
                                </div>
                                <div className=" mb-10  text-left">
                                    <input className=" cursor-pointer mr-2" onClick={() => { checkboxHandler("lth") }} id="lth" type="checkbox" />
                                    <span className=" cursor-pointer" onClick={() => { checkboxHandler("lth") }}>Low to high</span><br />
                                    <input className=" cursor-pointer" onClick={() => { checkboxHandler("htl") }} id="htl" type="checkbox" />
                                    <span className=" cursor-pointer" onClick={() => { checkboxHandler("htl") }}>High to low</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Filter;