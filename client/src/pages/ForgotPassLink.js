import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const ForgotPassLink = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
    })

    const setData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const saveForm = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/user/forgot-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            if (data) {
                //console.log("successs-", data);
                if (data.sucess) {
                    //toast(data.msg,{position: "bottom-right"})
                    toast.success(data.msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    setFormData({
                        email: '',
                    })
                } else {
                    //toast(data.msg,{position: "bottom-right"})
                    toast.error(data.msg, {
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
            } else {
                console.log("there is no data found");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4 mt-3 p-3 border border-1 border-black">
                        <form method="post" onSubmit={saveForm}>
                            <div className="mb-3">
                                <label className="form-label m-0">Enter Email</label>
                                <input type="email" name="email" value={formData.email} onChange={(e) => setData(e)} className="form-control" />
                            </div>

                            <div>
                                <button type="submit" className="btn btn-secondary">Send</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassLink;