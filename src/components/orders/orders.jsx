import { useContext, useEffect, useState } from "react";
import "./orders.css";
import { AppContext } from "../../contextApi/AppContext";
import NotFoundProduct from "../../notFound/notFound";
import { Link } from "react-router-dom";

const OrderDetails = () => {
    const [allOrder, setAllOrder] = useState([]);
    const { token } = useContext(AppContext);

    const getAllOrders = async () => {
        try {
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
            console.log("order", data);
        }
        catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        getAllOrders()
    }, []);

    return (
        <div>
            {token ? <>
                <p className=" text-2xl font-bold p-4 bg-gray-300 mb-3">Orders</p>
                <div className="">
                    <div className="  m-auto gap-y-4 justify-start
                 orderBox">
                        {allOrder?.map((val) => {
                            return (
                                <div className="flex bg-gray-100 p-2 mx-4 gap-2 orderCard">
                                    <Link to={`/product-details/${val.order.items[0].product._id}`} ><img className="w-20 " src={val.order.items[0].product.displayImage} alt="" /></Link>
                                    <div className="flex flex-col text-left justify-around">
                                        <p className=" font-semibold">{val.order.items[0].product.name}</p>
                                        <p><span className=" font-semibold">Price: </span>{val.order.items[0].product.price}</p>
                                        <p><span className=" font-semibold">Order Date:</span> {val.createdAt}</p>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
            </> : <NotFoundProduct />}
        </div>
    )
}

export default OrderDetails;