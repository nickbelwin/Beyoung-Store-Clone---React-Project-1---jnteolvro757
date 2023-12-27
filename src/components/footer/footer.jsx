import "./footer.css";

const Footer=()=>{
    return(
        <>
            <footer className=" text-white bg-black pt-10">
                <section className="footerMainBox">
                <div className=" flex mb-10 justify-between footerInfoBox1">
                    <div className=" text-left mr-5">
                        <h1 className=" text-3xl font-semibold text-yellow-400">NEED HELP</h1>
                        <p>Contact Us</p>
                        <p>Track Order</p>
                        <p>Returns & Refunds</p>
                        <p>FAQ's</p>
                        <p>Career</p>
                    </div>
                    <div className=" text-left mr-5">
                        <h1 className=" text-3xl font-semibold text-yellow-400">COMPANY </h1>
                        <p>About Us</p>
                        <p>Beyoung Blog</p>
                        <p>Beyoungistan</p>
                        <p>Collaboration</p>
                        <p>Media</p>
                    </div>
                    <div className=" text-left mr-5">
                        <h1 className=" text-3xl font-semibold text-yellow-400">MORE INFO</h1>
                        <p>Term and Conditions</p>
                        <p>Privacy Policy</p>
                        <p>Shipping Policy</p>
                        <p>Sitemap</p>
                    </div>
                    <div className=" text-left">
                        <h1 className=" text-3xl font-semibold text-yellow-400">LOCATION</h1>
                        <p>support@beyoung.in</p>
                        <p>Eklingpura Chouraha, Ahmedabad Main Road</p>
                        <p>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</p>
                        <h1 className=" mt-5 mb-2 text-3xl font-semibold text-yellow-400">DOWNLOAD THE APP</h1>
                        <div className="flex flex-wrap">
                            <button className="mr-5 mb-5"><img src="https://www.beyoung.in/api/catalog/footer/11Play-Store-footer.png" alt="" /></button>
                            <button className=" w-fit h-fit"><img src="https://www.beyoung.in/api/catalog/footer/12App-Store-footer.png" alt="" /></button>
                        </div>
                    </div>
                </div>
                <div className="flex mb-10 text-left paymentSocialMediaBox">
                    <div className=" w-2/4 pr-10 mr-10 paymentIcon">
                        <h1 className=" text-3xl font-semibold ">100% SECURE PAYMENT</h1>
                        <img src="https://www.beyoung.in/api/catalog/footer/Frame-payment%20-1.jpg" alt="" />
                    </div>
                    <div className="socialMediaIcon">
                        <h1 className=" text-3xl font-semibold mb-3">LET'S BE FRIENDS</h1>
                        <div className=" flex flex-wrap ">
                            <img src="https://www.beyoung.in/api/catalog/footer/Frame3-1.jpg" alt="" />
                            <img src="https://www.beyoung.in/api/catalog/footer/Frame4-1.jpg" alt="" />
                            <img src="https://www.beyoung.in/api/catalog/footer/Frame5-1.jpg" alt="" />
                            <img src="https://www.beyoung.in/api/catalog/footer/Frame6-1.jpg" alt="" />
                            <img src="https://www.beyoung.in/api/catalog/footer/Frame7-1.jpg" alt="" />
                            <img src="https://www.beyoung.in/api/catalog/footer/Frame8-1.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <p className="text-lg font-bold pb-10">Copyright © 2023 Beyoung Folks Pvt Ltd. All rights reserved.</p>
                </section>
            </footer>
        </>

    )
}

export default Footer;