import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Home = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
    })

    const showHome = async () => {

        const token = Cookies.get("jwtToken")

        if (token) {

            //Note - instead of doing this we can create one common auth moddlewar for all router
//
//http://localhost:5000/api/home
            const res = await fetch("https://shopping-cart-with-auth.onrender.com/api/home", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: "include"
            })

            const resObj = await res.json();
            //console.log(resObj.status)
            if (resObj.sucess) {
                const { username, email, mobile } = resObj.data;

                setFormData({
                    username,
                    email,
                    mobile,
                })
                //console.log(resObj.data);
            } else {
                console.log(resObj)
            }
        }
    }

    useEffect(() => {
        showHome()
    }, [])


    return (
        <>
            <div className="container text-center">
                <h1>Welcome {formData ? formData.username : ''}<br /> We are MERN Developers</h1>
                <h2>{formData ? formData.email : ''}</h2>
                <h2>{formData ? formData.mobile : ''}</h2>
            </div>

        </>
    )
}

export default Home;