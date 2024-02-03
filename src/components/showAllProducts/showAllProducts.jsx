import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Filter from "../filterSection/filter";
import "./showAllProducts.css"
import NotFoundProduct from "../../notFound/notFound";
import Loading from "../loading/loading";
import Footer from "../footer/footer";
import { AppContext } from "../../contextApi/AppContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    const [grow, setGrow] = useState("0");
    const { token, openLogin, wishlistProducts, setWishlistProducts, } = useContext(AppContext);
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
    }, [id,token]);
    const linkHandler = (productid) => {
        // e.stopPropagation();
        // console.log("product: ", e.target.parentNode.id);
        navigate(`/product-details/${productid}`);
    }


    const addFavotiteItems = async (idx) => {
        console.log(token, "===", idx);
        console.log(JSON.stringify({ "productId": idx }))
        let obj = { "productId": idx }
        try {
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,
                {
                    method: 'PATCH',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...obj })

                }
            );
            let jsonData = await getData.json();
            console.log("added", jsonData);
        }
        catch (error) {
            console.log("ERROR", error);
        }
    }
    const getCartProducts = async () => {
        try {
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
    const removeFavoriteItem= async(idx)=>{
        try{
            let getData = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${idx}`,
                {
                    method: 'DELETE',
                    headers: {
                        'projectId': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
            );

        }catch(error){
            console.log(error)
        }
    }
    const favoriteIconFunc = (e,productid) => {
        e.stopPropagation();
        let idx = e.target.id;
        console.log("idx", idx);
        if (token) {
            if (!wishlistProducts.includes(productid)) {
                document.getElementById(idx).classList.add("in-wishlist");
                addFavotiteItems(productid);
                console.log("added")
            }
            else {
                document.getElementById(idx).classList.remove("in-wishlist");
                removeFavoriteItem(productid);
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
    }, []);
    useEffect(()=>{
        if(product){
            setGrow("1")
        }else{
            setGrow("0")
        }
    },[product]);

    return (
        <>
            <section id="allBoxId" className="flex relative justify-start pt-8 mt-8 allBox">
                {!loader ? filterProducts ? <div className=" overflow-y-scroll  filterContainer">
                    <Filter className="justify-start" allColors={allColors} allSizes={allSizes} closeFuncHandler={closeFunc} selectedColor={checkColor} selectedSize={checkSize} />
                </div> : <NotFoundProduct /> : ""}
                <div style={{flexGrow: grow}} className="flex cardBox allCardBox"> 
                    {!loader ? filterProducts?.map((val) => {
                        return (
                           
                                <div className=" text-left card" onClick={()=>{linkHandler(val._id)}} key={val._id} >
                                    <LazyLoadImage className="image rounded-md" src={val.displayImage} placeholderSrc={"https://www.beyoung.in/beyoung-loader.gif"} />
                                    {/* <img className="image rounded-md" src={val.displayImage} alt="" /> */}
                                    <span className="cardName  text-slate-700 font-semibold">{val.name}</span>
                                    <span className="text-left text-gray-400 text-sm">{val.subCategory}</span>
                                    <p className="text-left flex justify-between mt-2">₹{val.price} <div class=" mr-3 wrapper" >
                                        {wishlistProducts?.includes(val._id) ? <div class="icon-wishlist in-wishlist" id={val._id + 1} onClick={(e)=>{favoriteIconFunc(e,val._id)}} ></div> : <div class="icon-wishlist" id={val._id + 1} onClick={(e)=>{favoriteIconFunc(e,val._id)}}></div>}
                                    </div></p>
                                </div>
                          
                        )
                    }) : <Loading />}
                    {!loader ? <div className=" absolute footerBottom">
                        <Footer />
                    </div> : ""}
                </div>

            </section>

        </>
    )
}

export default ShowAllProducts;