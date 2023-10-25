import React from "react";

const Footer = () => {
    return (
        <>
            <div style={{ backgroundColor: "#F8F9FA" }} className="container ">
                    <p className="text-center mt-3 p-3">&copy; {new Date().getFullYear()} Powered By Developers</p>
            </div>
        </>
    )
}
export default Footer;