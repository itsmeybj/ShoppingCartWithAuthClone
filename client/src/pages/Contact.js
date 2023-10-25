import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const Contact = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        message: ''
    })

    const showContact = async () => {

        //Note - in server httpOnly must be false while setting cookie
        const token = Cookies.get("jwtToken")

        if (token) {

            //Note - instead of doing this we can create one common auth moddlewar for all router
//
//http://localhost:5000/api/contact
            const res = await fetch("https://shopping-cart-with-auth.onrender.com/api/contact", {
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
                    message: ""
                })
                //console.log(resObj.data);
            } else {
                console.log(resObj)
            }
        }
    }

    useEffect(() => {
        showContact()
    }, [])

    const setData = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        })

    }
    const sendContactMessage = async (e) => {
        e.preventDefault();

        //Note - if monodb connection refused error then try to start its service mongodb from 
        //taskbar->task managr->services

        const token = Cookies.get("jwtToken")

        if (token) {
            try {
                //http://localhost:5000/api/contact/submit-contact
                const res = await fetch("https://shopping-cart-with-auth.onrender.com/api/contact/submit-contact", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: "include",
                    body: JSON.stringify(formData)
                })

                const resObj = await res.json()
                //console.log(resObj)

                if (resObj.sucess) {
                    toast.success(resObj.msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error(resObj.msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            } catch (err) {
                console.log(err);
            }

        } else {
            console.log('Token is not set or empty')
        }
    }

    return (
        <>
            <div className="container text-center border border-1 mt-2 p-2">
                <h1 className="mt-2">Contact Page</h1>

                <form method="post" onSubmit={sendContactMessage}>
                    <div className="row mt-4">

                        <div className="col-2"></div>

                        <div className="col-8">
                            <div className="d-flex flex-row justify-content-between gap-2" >

                                <input className="form-control" name="username" onChange={setData} value={formData.username} placeholder="Name" type="text" />
                                <input className="form-control" name="email" onChange={setData} value={formData.email} placeholder="Email" type="email" />
                                <input className="form-control" name="mobile" onChange={setData} value={formData.mobile} placeholder="Mobile" type="text" />

                            </div>
                        </div>

                        <div className="col-2"></div>

                    </div>

                    <div className="row mt-3">

                        <div className="col-2"></div>

                        <div className="col-8">
                            <div>
                                <textarea name="message" value={formData.message} onChange={setData} className="form-control" placeholder="What do you want to say?" />
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-2"></div>
                        <div className="col-8 d-flex flex-row gap-2">
                            <div><button className="btn btn-secondary">Send Message</button></div>
                            <div><button type="reset" className="btn btn-secondary">Clear</button></div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Contact;