import { useContext, useEffect, useState } from "react";
import "./orders.css";
import { AppContext } from "../../contextApi/AppContext";
import NotFoundProduct from "../notFound/notFound";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../loading/loading";


const OrderDetails = () => {
    const [allOrder, setAllOrder] = useState([]);
    const [loader, setLoader] = useState(true);
    const { token, openLogin } = useContext(AppContext);

    const getAllOrders = async () => {
        setLoader(true);
        try {
            console.log("order", token);
            let getData = await fetch(" https://academics.newtonschool.co/api/v1/ecommerce/order",
                {
                    method: 'GET',
                    headers: {
                        'projectID': 'zx5u429ht9oj',
                        "Authorization": `Bearer ${token}`,
                    },
                });
            let data = await getData.json();
            setAllOrder(data.data)
            console.log("order data", data);
            // if (data.status === "fail") {
            //     setAllOrder([]);
            // }
        }
        catch (error) {
            console.log("Error", error);

        }
        setLoader(false);
    }
    useEffect(() => {
        getAllOrders();
    }, [token]);


    return (
        <Suspense fallback={<Loading />}>
            <>
                {!loader ?
                    <div>
                        {allOrder?.length < 1 ? <div className=" flex justify-center flex-col noOrderProductBox">
                            <img className="noOrderProductImg" src="https://www.beyoung.in/images/common/empty.gif" alt="" />
                            <h1 className=" text-4xl mb-2 font-semibold underline">Haven't ordered yet?</h1>
                            <p className=" text-sm mb-3">Explore and shop the coolest fashion now!</p>
                            <Link to="/">
                                <button className="py-3 px-40 rounded-lg bg-yellow-400  font-bold text-xl cartContinueBtn">Continue Shopping</button>
                            </Link>
                        </div> :
                            token ? <>
                                <p className=" text-2xl font-bold p-4 bg-gray-100 mt-3 mb-3 w-3/4 m-auto">Your Orders</p>
                                <div className="">
                                    <div className="  m-auto gap-4 justify-start w-3/4 orderBox">
                                        {allOrder?.map((val) => {
                                            return (
                                                <div className="flex bg-gray-100 p-2 mx-4 gap-2 orderCard">
                                                    <Link to={`/product-details/${val.order.items[0].product._id}`} ><img className="w-20 " src={val.order.items[0].product.displayImage} alt="" /></Link>
                                                    <div className="flex flex-col text-left justify-around">
                                                        <p className=" font-semibold">{val.order.items[0].product.name}</p>
                                                        <p><span className=" font-semibold">Price: </span>{val.order.items[0].product.price}</p>
                                                        <p><span className=" font-semibold">Order Date:</span> { val.createdAt.slice(0,10)}</p>
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </div>
                                </div>
                            </> : <NotFoundProduct />}
                    </div> : <Loading />}
            </>
        </Suspense>
    )
}

export default OrderDetails;