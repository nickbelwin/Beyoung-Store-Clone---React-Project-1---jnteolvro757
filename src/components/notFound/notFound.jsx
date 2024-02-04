import { Link } from "react-router-dom";

import "./notFound.css";

const NotFoundProduct=()=>{
    return(
        <>
            <main className="productNotFoundImg">
                <div>
                    <img className=" m-auto w-2/4" src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp" alt="not found img" />
                    <p className=" text-2xl font-semibold text-gray-500"><span className=" text-red-700 font-bold">Sorry</span>, Product is not available!!!</p>
                </div>
            </main>
        </>
    )
}

export default NotFoundProduct;