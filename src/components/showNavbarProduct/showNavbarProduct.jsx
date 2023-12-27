import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import "./showNavbarProduct.css"
import Filter from "../filterSection/filter";
import { AppContext } from "../../contextApi/AppContext";
import Filter2 from "../filterSection/filter";
import NotFoundProduct from "../../notFound/notFound";
import Loading from "../loading/loading";
import Heart from "react-animated-heart";
import Footer from "../footer/footer";

const ShowNavbarProducts = () => {
    const { id, gender } = useParams();
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
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [active, setActive] = useState(false)

    const { token, openLogin, wishlistProducts, setWishlistProducts, } = useContext(AppContext);

    console.log(id);
    // const body= {a:1};
    const getProducts = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${id}"}&filter={"gender":"${gender}"}`,
                {
                    method: 'GET',
                    headers: { 'projectId': 'zx5u429ht9oj' },
                }
            );
            let data = await getData.json();
            // console.log("data: ", data);
            setProduct(data.data);
            setFilterProducts(data.data);
            setLoader(false);
            // console.log("setProduct 0:", product)
        }
        catch (error) {
            console.log("Error: ", error);
            setLoader(false);
        }
        // console.log("setProduct 0:", product)
    }
    useEffect(() => {
        getProducts();
        console.log("id called")
    }, [id, token]);

    const linkHandler = (e) => {
        e.stopPropagation();
        console.log("product: ", e.target.parentNode.id);
        navigate(`/product-details/${e.target.parentNode.id}`);
    }

    // fovorite icon function------------

    const addFavotiteItems = async (idx) => {
        console.log(token, "===", idx);
        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
                {
                    method: 'PATCH',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ "productId": idx })

                }
            );
            let jsonData = await getData.json();
            console.log("added");
            // setFavoriteItems(jsonData.data.items);
        }
        catch (error) {
            console.log("ERROR", error);
        }
    }
    const getCartProducts = async () => {
        try {
            setLoader(true);
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,
                {
                    method: 'GET',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            let jsonData = await getData.json();
            let cartItem = jsonData.data.items;
            setFavoriteItems(cartItem);
            cartItem = cartItem.map((val) => {
                return val.products._id;
            });
            console.log("cart", cartItem);
            setWishlistProducts(cartItem);
        }
        catch (error) {
            console.log("ERROR", error);
        }
        console.log(wishlistProducts);
    }
    console.log(wishlistProducts);

    const favoriteIconFunc = (e) => {
        e.stopPropagation();
        let parentId = e.target.parentNode.id;
        let idx = e.target.id;
        console.log("parentId", parentId)
        console.log("idx", idx);
        if (token) {
            if (!wishlistProducts.includes(parentId)) {
                document.getElementById(idx).classList.add("in-wishlist");
                addFavotiteItems(parentId);
                console.log("added")
            }
            else {
                document.getElementById(idx).classList.remove("in-wishlist");
                console.log("removed")
            }
        } else {
            openLogin();
        }

    }

    useEffect(() => {
        if (!token) {
            setWishlistProducts([])
        }
    }, [token])
    useEffect(() => {
        getCartProducts();
    }, [token]);


    // Filter code -----------------------------------------------------------------------------
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
    // close function for closing colors and size box
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
    // function for check which color is selected
    const checkColor = (e) => {
        let id = e.target.id;
        if (prevColor != id) {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "1px solid rgb(203, 203, 203)";
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
    const selectedColorMobile = (e) => {
        let id = e.target.id;
        if (prevColor != id) {
            allColors?.forEach((val) => {
                document.getElementById(val).style.border = "1px solid rgb(203, 203, 203)";
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
    // function for check which size is selected
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
    // function for get the product by selected color and size
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

    // this useEffect call given function for getting all colors and sizes
    useEffect(() => {
        getAllColor();
        getAllSizes();
    }, [product]);

    return (
        <>
            <section className="flex pb-10 relative justify-start pt-8 mt-10 navCategoryBox">
                {!loader ? product ? <div className=" overflow-y-scroll filterSide">
                    <Filter className="justify-start" allColors={allColors} allSizes={allSizes} closeFuncHandler={closeFunc} selectedColor={checkColor} selectedColorMobile={selectedColorMobile} selectedSize={checkSize} />
                </div> : <NotFoundProduct /> : ""}
                <div className="flex flex-wrap gap-8 allCardBox">
                    {!loader ? filterProducts?.map((val) => {
                        return (
                            <div onClick={linkHandler} key={val._id}>
                                <div className=" relative card" id={val._id}>
                                    {/* <div class="absolute right-2 bottom-1 wrapper" id={val._id} >
                                    {wishlistProducts.includes(val._id)? <div class="icon-wishlist in-wishlist" id={val._id+1} onClick={favoriteIconFunc} ></div>:<div class="icon-wishlist" id={val._id+1} onClick={favoriteIconFunc} ></div>}
                                </div> */}
                                    {val.displayImage ? <img className="image rounded-md" src={val.displayImage} alt="" /> : <img src="https://www.beyoung.in/beyoung-loader.gif" />}
                                    <span className="cardName cursor-pointer text-left text-slate-700 font-semibold">{val.name}</span>
                                    <span className="text-left cursor-pointer text-gray-400 text-sm">{val.subCategory}</span>
                                    <p className="text-left cursor-pointer pt-2">₹{val.price}</p>
                                </div>
                            </div>
                        )
                    }) : <Loading />}

                </div>
                {!loader? <div className=" absolute footerBottom">
                        <Footer />
                    </div>:""}
            </section>
            
        </>

    )
}

export default ShowNavbarProducts;