import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Filter from "../filterSection/filter";
import "./showAllProducts.css"
import NotFoundProduct from "../../notFound/notFound";
import Loading from "../loading/loading";
import Footer from "../footer/footer";

const ShowAllProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [selectColor, setSelectColor] = useState("");
    const [selectSize, setSelectSize] = useState("");
    const [prevColor, setPrevColor] = useState("");
    const [prevSize, setPrevSize] = useState("");
    const [colorFlag, setColorFlag] = useState(true);
    const [sizeFlag, setSizeFlag] = useState(true);

    console.log(id);

    const getProducts = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${id}"}`,
                {
                    method: 'GET',
                    headers: { 'projectId': 'zx5u429ht9oj' },
                }
            );
            let data = await getData.json();
            console.log("data: ", data);
            setProduct(data.data);
            setLoader(false);
            console.log("setProduct 0:", product)
        }
        catch (error) {
            console.log("Error: ", error);
            setLoader(false);
        }
        console.log("setProduct 0:", product)
    }
    useEffect(() => {
        getProducts();
    }, [id]);
    const linkHandler = (e) => {
        e.stopPropagation();
        console.log("product: ", e.target.parentNode.id);
        navigate(`/product-details/${e.target.parentNode.id}`);
    }

    // filter code------------------------------------------------------------------------

    const getAllColor = () => {
        let color = product?.map((val) => {
            return val.color;
        });
        console.log("color=> ", color);
        color = Array.from(new Set(color));
        setAllColors(color);
    }

    const getAllSizes = () => {
        let size = product?.map((val) => {
            return val.size;
        });
        let newSize = [];
        size?.forEach((val) => {
            newSize.push(...val);
        })
        size = [...newSize];
        console.log("newSize => ", newSize);
        size = Array.from(new Set(size));
        setAllSizes(size);
    }
    const closeFunc = (e) => {
        console.log(e.target.parentNode.id)
        if (e.target.parentNode.id === "color") {
            if (colorFlag) {
                document.getElementById("allColors").style.display = "none";
                document.querySelector(".colorArrow").style.transform = "rotate(-90deg)";
                setColorFlag(false);
            }
            else {
                document.getElementById("allColors").style.display = "flex";
                document.querySelector(".colorArrow").style.transform = "rotate(90deg)";
                setColorFlag(true);
            }

        }
        else {
            if (sizeFlag) {
                document.getElementById("allSizes").style.display = "none";
                document.querySelector(".sizeArrow").style.transform = "rotate(-90deg)";
                setSizeFlag(false);
            }
            else {
                document.getElementById("allSizes").style.display = "block";
                document.querySelector(".sizeArrow").style.transform = "rotate(90deg)";
                setSizeFlag(true);
            }

        }
    }

    const checkColor = (e) => {
        let id = e.target.id;
        if (prevColor != id) {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "none";
            });

            document.getElementById(id).style.border = "1px solid blue";
            setFilterProducts(product);
            setSelectColor(id);
            setPrevColor(id);
        }
        else {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "none";
            });
            setFilterProducts(product);

            setSelectColor("");
            setPrevColor("");

        }
    }

    const checkSize = (e) => {
        let id = e.target.id;
        if (prevSize != id) {
            allSizes?.forEach((val) => {
                document.getElementById(val).style.color = "";
            })
            document.getElementById(id).style.color = "blue";
            setSelectSize(id);
            setPrevSize(id);

        }
        else {
            allSizes?.forEach((val) => {
                document.getElementById(val).style.color = "";
            })
            setPrevSize("");
            setSelectSize("");


        }


    }

    const filterColor = () => {
        if (selectColor && selectSize) {
            let selectedBoth = product?.filter((val) => {
                if (selectColor === val.color && val.size.includes(selectSize)) {
                    return val;
                }
            });
            setFilterProducts(selectedBoth);
        }
        else if (selectColor) {

            let selectedColor = product?.filter((val) => {
                if (selectColor === val.color) {
                    return val;
                }
            });
            setFilterProducts(selectedColor);

        }
        else if (selectSize) {
            let selectedSize = product?.filter((val) => {
                if (val.size.includes(selectSize)) {
                    return val;
                }
            });
            setFilterProducts(selectedSize);
        }
        console.log("filterProducts", filterProducts);
    }

    useEffect(() => {
        filterColor()
    }, [selectColor, selectSize]);

    useEffect(() => {
        getAllColor();
        getAllSizes();
        setFilterProducts(product);
    }, [product]);
    useEffect(() => {
        window.scrollTo(0, 0);
      },[]);

    return (
        <>
            <section id="allBoxId" className="flex relative justify-start pt-8 mt-8 allBox">
                {!loader ? filterProducts ? <div className=" overflow-y-scroll  filterContainer">
                    <Filter className="justify-start" allColors={allColors} allSizes={allSizes} closeFuncHandler={closeFunc} selectedColor={checkColor} selectedSize={checkSize} />
                </div> : <NotFoundProduct /> : ""}
                <div className="flex cardBox">
                    {!loader ? filterProducts?.map((val) => {
                        return (
                            <div onClick={linkHandler} key={val._id}>
                                <div className="card" id={val._id}>
                                    {val.displayImage ? <img className="image rounded-md" src={val.displayImage} alt="" /> : <img src="https://www.beyoung.in/beyoung-loader.gif" />}
                                    <span className="cardName  text-slate-700 font-semibold">{val.name}</span>
                                    <span className="text-left text-gray-400 text-sm">{val.subCategory}</span>
                                    <p className="text-left mt-2">₹{val.price}</p>
                                </div>
                            </div>
                        )
                    }) : <Loading />}
                    {!loader? <div className=" absolute footerBottom">
                        <Footer />
                    </div>:""}
                </div>

            </section>

        </>
    )
}

export default ShowAllProducts;