import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const ChangePassword = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: ''
    })

    const setData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const updateData = async (e) => {
        e.preventDefault();

        //Note - in server httpOnly must be false while setting cookie
        const token = Cookies.get('jwtToken')

        try {
            const res = await fetch("http://localhost:5000/api/user/update-password", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
                credentials: "include"
            })

            const data = await res.json()
            //console.log(data)
            if (data.sucess == false) {
                //console.log(data.msg)
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
            } else {
                //console.log(data.msg)
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

            }

        } catch (err) {
            console.log(err);
        }

        setFormData({
            old_password: '',
            new_password: ''
        })
    }

    return (
        <>
            <div className="container border border-1 p-3 mt-2">
                <div className="text-center mt-2">
                    <h2>Change your Password</h2>
                </div>

                <div className="row mt-4">

                    <div className="col-2"></div>

                    <div className="col-8">

                        <form method="put" onSubmit={updateData}>
                            <div>
                                <label className="form-label m-0">Enter Old Password</label>
                                <input className="form-control" type="password" name="old_password" value={formData.old_password} onChange={setData} />
                            </div>

                            <div className="mt-3">
                                <label className="form-lebel">Enter New Password</label>
                                <input className="form-control" type="password" name="new_password" value={formData.new_password} onChange={setData} />
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-secondary" type="submit">Change Password</button>
                            </div>
                        </form>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword;