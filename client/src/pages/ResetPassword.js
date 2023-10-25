import React, { useState } from "react";
import {toast} from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

    const navigate = useNavigate()
    const {token} = useParams()

    const [formData, setFormData] = useState({
        password: '',
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
        //console.log(formData);

        let obj = {
            token : token,
            password : formData.password
        }

        try {
            const res = await fetch('http://localhost:5000/api/user/reset-password', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })

            const data = await res.json();
            if (data) {
                //console.log("successs-", data);
                if(data.sucess){
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

                    setFormData({password: ''})
                    
                }else{
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
                        <form method="put" onSubmit={saveForm}>
                            <div className="mb-3">
                                <label className="form-label m-0">Enter New Password</label>
                                <input type="password" name="password" value={formData.password} onChange={(e) => setData(e)} className="form-control" />
                            </div>
                            
                            <div>
                                <button type="submit" className="btn btn-secondary">Change Password</button>
                            </div>
                            </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;