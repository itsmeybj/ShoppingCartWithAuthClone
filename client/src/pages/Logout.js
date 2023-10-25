import Cookies from "js-cookie";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App'
import { useDispatch } from "react-redux";
import { loginStatus } from "../store/slices/authSlice";

const Logout = () => {
    const navigate = useNavigate()
    //const {state, dispatch} = useContext(UserContext)

    const dispatch = useDispatch()

    useEffect(() => {

        //dispatch({ type: "USER", payload: false })
        dispatch(loginStatus(false))
        
        const token = Cookies.remove("jwtToken")
        
        navigate("/login")
    })
    return (
        <></>
    )
}

export default Logout;