import { Link } from "react-router-dom";
import "./forMenShirt.css"

const ForMenShirt= ()=>{
    return(
        <div className="forMenShirtBox">
            <p className=" text-left mt-12 text-2xl font-semibold pl-4 shirtTag">SHIRTS</p>
            <p className=" text-left ml-5 mb-3">Formal To Casual Styles</p>
            <div className="flex gap-5">
                <Link to="category/shirt/Men"><img className="rounded-lg " src="https://www.beyoung.in/api/catalog/homepage-28-11/shirts/Regular-Shirts.jpg" alt="" /></Link>
                <Link to="category/printed shirt/Men"><img className="rounded-lg " src="https://www.beyoung.in/api/catalog/homepage-28-11/shirts/Limited-Edition.jpg" alt="" /></Link>
                <Link to="category/shirt/Men"><img className="rounded-lg " src="https://www.beyoung.in/api/catalog/homepage-28-11/shirts/Shirt-Combos.jpg" alt="" /></Link>
            </div>
        </div>
    )
}

export default ForMenShirt;