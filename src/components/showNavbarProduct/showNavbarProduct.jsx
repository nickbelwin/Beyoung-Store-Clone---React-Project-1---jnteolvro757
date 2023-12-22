import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import "./showNavbarProduct.css"
import Filter from "../filterSection/filter";
import { AppContext } from "../../contextApi/AppContext";
import Filter2 from "../filterSection/filter";
import NotFoundProduct from "../../notFound/notFound";
import Loading from "../loading/loading";

const ShowNavbarProducts = () => {
    const { id, gender } = useParams();
    // console.log("id: ",id, "gender: ",gender);
    const navigate = useNavigate(); 
    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState([]);
    const [filterProducts,setFilterProducts]=useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [selectColor, setSelectColor]=useState("");
    const [selectSize, setSelectSize]=useState("");
    const [prevColor, setPrevColor]=useState("");
    const [prevSize, setPrevSize]=useState("");
    const [colorFlag, setColorFlag]=useState(true);
    const [sizeFlag, setSizeFlag]=useState(true);

    const globalData = useContext(AppContext);
    
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
    }, [id]);
    
    const linkHandler = (e) => {
        e.stopPropagation();
        console.log("product: ", e.target.parentNode.id);
        navigate(`/product-details/${e.target.parentNode.id}`);
    }

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
    const closeFunc=(e)=>{ 
        console.log(e.target.parentNode.id)
        if(e.target.parentNode.id === "color"){
            if(colorFlag){
                document.getElementById("allColors").style.display="none";
                document.querySelector(".colorArrow").style.transform= "rotate(-90deg)";
                setColorFlag(false);
            }
            else{
                document.getElementById("allColors").style.display="flex";
                document.querySelector(".colorArrow").style.transform= "rotate(90deg)";
                setColorFlag(true);
            }
            
        }
        else{
            if(sizeFlag){
                document.getElementById("allSizes").style.display="none";
                document.querySelector(".sizeArrow").style.transform= "rotate(-90deg)";
                setSizeFlag(false);
            }
            else{
                document.getElementById("allSizes").style.display="block";
                document.querySelector(".sizeArrow").style.transform= "rotate(90deg)";
                setSizeFlag(true);
            }

        }
    }
    
    const checkColor=(e)=>{
        let id=e.target.id;
        if(prevColor != id){ 
            allColors?.forEach((val)=>{
                document.getElementById(val).style.border="1px solid rgb(203, 203, 203)";
            });
            
            document.getElementById(id).style.border="1px solid blue";
            setFilterProducts(product);
            setSelectColor(id);
            setPrevColor(id);
        }
        else{
            allColors?.forEach((val)=>{
                document.getElementById(val).style.border="none";
            });
            setFilterProducts(product);
           
            setSelectColor("");
            setPrevColor("");
            
        } 
    }

    const checkSize = (e) => {
        let id = e.target.id;
        if(prevSize != id){
            allSizes?.forEach((val) => {
                document.getElementById(val).style.color = "";
            })
            document.getElementById(id).style.color = "blue";
            setSelectSize(id);
            setPrevSize(id);
            
        }
        else{
            allSizes?.forEach((val) => {
                document.getElementById(val).style.color = "";
            })
            setPrevSize("");
            setSelectSize("");
            
            
        }
        
    
    }

    const filterColor=()=>{
        if(selectColor && selectSize){
            let selectedBoth= product?.filter((val)=>{
                if(selectColor === val.color && val.size.includes(selectSize)){
                    return val;
                }
            });
            setFilterProducts(selectedBoth);
        }
        else if(selectColor){

            let selectedColor= product?.filter((val)=>{
                if(selectColor === val.color){
                    return val;
                }
            });
            setFilterProducts(selectedColor);
            
        }
        else if(selectSize){
            let selectedSize= product?.filter((val)=>{
                if(val.size.includes(selectSize)){
                    return val;
                }
            });
            setFilterProducts(selectedSize);
        }
        console.log("filterProducts",filterProducts);
    }

    useEffect(()=>{
        filterColor()
    },[selectColor,selectSize])
    useEffect(()=>{
        getAllColor();
        getAllSizes();
    },[product]);
     
    return (
        <section className="flex relative justify-start pt-8 mt-10 navCategoryBox">
            {!loader? product? <div className=" overflow-y-scroll pr-2 mr-3 filterSide">
                <Filter className="justify-start" allColors={allColors} allSizes={allSizes} closeFuncHandler={closeFunc} selectedColor={checkColor} selectedSize={checkSize} />
            </div>: <NotFoundProduct/> : "" }
            <div className="flex flex-wrap gap-8 allCardBox">
                {!loader ? filterProducts?.map((val) => { 
                    return (
                        <div onClick={linkHandler} key={val._id}>
                            <div className="card" id={val._id}>
                                {val.displayImage ? <img className="image rounded-md" src={val.displayImage} alt="" /> : <img src="https://www.beyoung.in/beyoung-loader.gif" />}
                                <span className="cardName cursor-pointer text-left text-slate-700 font-semibold">{val.name}</span>
                                <span className="text-left cursor-pointer text-gray-400 text-sm">{val.subCategory}</span>
                                <p className="text-left cursor-pointer pt-2">₹{val.price}</p>
                            </div>
                        </div> 
                    )
                }) : <Loading/>}
            </div>
        </section>

    )
}

export default ShowNavbarProducts;