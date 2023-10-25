import React, { useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'

import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';

const Register = () => {

    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        repassword: '',
        gender: '',
        profession: '',
        term: false,
        image : ''
    })

    const setData = (e) => {
        //we are not using another usestate hook for storing saveform button click data
        //because we dont want to show data on button click and show it on schreen

        const name = e.target.name;
        let value = null;

        if(e.target.type === "file"){
            value = e.target.files[0]
        }
        else if(e.target.type == "checkbox"){
            value = e.target.checked
        }
        else{
            value = e.target.value
        }
        
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const saveForm = async (e) => {
        e.preventDefault();
        
        const myForm = new FormData()
        myForm.append('username',formData.username)
        myForm.append('email',formData.email)
        myForm.append('mobile',formData.mobile)
        myForm.append('password',formData.password)
        myForm.append('repassword',formData.repassword)
        myForm.append('gender',formData.gender)
        myForm.append('term',formData.term)
        myForm.append('profession',formData.profession)
        myForm.append('image',formData.image)

        try {
            const res = await fetch('http://localhost:5000/api/user/register', {
                 method: "POST",
                body: myForm
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

                    setFormData({
                        username: '',
                        email: '',
                        mobile: '',
                        password: '',
                        repassword: '',
                        gender: '',
                        profession: '',
                        term: false,
                        image : '',
                    })
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
                {/* {formData.username} {formData.email} {formData.mobile} {formData.password} {formData.repassword} {formData.profession} {formData.gender} {formData.term ? 'yes' : 'no'} */}
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4 mt-3 p-3 border border-1 border-black">
                        <form id="myForm" method="post" onSubmit={saveForm}>
                            <div className="mb-3">
                                <label className="form-label m-0">Enter Name</label>
                                <input type="text" name="username" value={formData.username} onChange={setData} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label m-0">Enter Email</label>
                                <input type="email" name="email" value={formData.email} onChange={(e) => setData(e)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label m-0">Enter Mobile</label>
                                <input type="text" name="mobile" value={formData.mobile} onChange={(e) => setData(e)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label m-0">Enter Password</label>
                                <input type="password" name="password" value={formData.password} onChange={(e) => setData(e)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label m-0">Re-Enter Password</label>
                                <input type="password" name="repassword" value={formData.repassword} onChange={(e) => setData(e)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label m-0 me-2">Choose Gender : </label>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="gender" value="male" onChange={setData} id="btnradio1" autoComplete="off" />
                                    <label className="btn btn-outline-secondary" for="btnradio1">
                                        <FcBusinessman className="fs-5" />
                                    </label>

                                    <input type="radio" className="btn-check" name="gender" value="female" onChange={setData} id="btnradio2" autoComplete="off" />
                                    <label className="btn btn-outline-secondary" for="btnradio2">
                                        <FcBusinesswoman className="fs-5" />
                                    </label>

                                </div>
                            </div>
                            <div className="mb-3">

                                <div className="dropdown">
                                    <label>Select Profession : </label>
                                    <select onChange={setData} name='profession' >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="other">Something else</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div>                                    
                                    <input type="file" name="image" onChange={setData} className="form-control" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <input type="checkbox" name="term" checked={formData.term} onChange={setData} />
                                <label className="form-label ms-2">I Accept Terms & Condition</label>

                            </div>
                            <div>
                                <button type="submit" className="btn btn-secondary">Register</button>
                                {' '}<a href="#" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={()=>navigate("/forgot-password-link")}>Forgot Password</a>
                                </div>


                        </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}

export default Register;