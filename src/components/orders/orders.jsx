import { useEffect } from "react";
import "./orders.css";

const OrderDetails=()=>{

    const getAllOrders= async()=>{

        try{
            let getData= await fetch(" https://academics.newtonschool.co/api/v1/ecommerce/order",
            {
                method: 'GET',
                headers: {
                    'projectID': 'zx5u429ht9oj',
                    "Authorization": `Bearer ${token}`,
                },
            });
            let data= getData.json();
            console.log("order",data);
        }
        catch(error){
            console.log("Error",error);
        }
    }

    useEffect(()=>{
        getAllOrders()
    },[]);

    return(
        <div>
            <p>Orders</p>
            <div>
                
            </div>
        </div>
    )
}

export default OrderDetails;