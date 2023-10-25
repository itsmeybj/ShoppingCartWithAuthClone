import React, { useState, useContext} from "react";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../App'
import { useDispatch } from "react-redux";
import { loginStatus } from "../store/slices/authSlice";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //const {state,dispatch} = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const setData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const saveFormData = async (e) => {
        e.preventDefault();

        //axios.defaults.withCredentials = true;
        //const data = await axios.post('http://localhost:5000/api/user/login', formData,{withCredentials :true})
        //console.log(data);

        //both code are working...
        
        //just write this lines inside server index.js 

        // const corsConfig = {
        //     origin: true,
        //     credentials: true,
        // };

        // app.use(cors(corsConfig));
        // app.options('*', cors(corsConfig))

        //and then use 

        // const cookieParser = require("cookie-parser")
        // app.use(cookieParser())
        //
        //http://localhost:5000/api/user/login
        const res = await fetch("https://shopping-cart-with-auth.onrender.com/api/user/login",{
            method:"post",
            credentials:"include",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(formData)
        })

        const data = await res.json()

        if(data){

            if(data.sucess){ 

                //dispatch({type:"USER",payload:true})
                dispatch(loginStatus(true))
                
                setFormData({
                    email: '',
                    password: '',
                })               
                navigate("/")//home page
            }else{

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
        }else{
            console.log("data not found");
        }
    }

return (
    <>
        <div className="container">
            <div className="row mt-3">
                <div className="col-4"></div>
                <div className="col-4 p-3 border border-1 border-black rounded">
                    <form method="post" onSubmit={saveFormData}>
                        <div className="mb-3">
                            <label className="form-label">Enter Email/Mobile</label>
                            <input type="text" className="form-control" name="email" value={FormData.email} onChange={setData} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Password</label>
                            <input type="password" className="form-control" name="password" value={FormData.password} onChange={setData} />
                        </div>
                        <div>
                        <button type="submit" className="btn btn-secondary">Login</button>
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

export default Login;