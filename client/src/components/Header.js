import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsFillCartCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getTotal } from "../store/slices/cartSlice";
import {loginStatus} from '../store/slices/authSlice'


const Header = () => {

    const { cartItems, totalQty, totalAmt } = useSelector((state) => state.cart)

    const {flag} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotal())
    })

    //const { state, dispatch } = useContext(UserContext)

    const RenderMenu = () => {
        //console.log(flag)
        if (flag) {//login is done
            return (
                <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/about"}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/contact"}>Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/products"}>Products</NavLink>
                        </li>
                    </ul>
                    <div className="nav-item text-end">
                        <NavLink className="btn btn-secondary m-2" to={"/change-password"}>Change Password</NavLink>
                        <NavLink className="btn btn-secondary" to={"/logout"}>Logout</NavLink>
                        <NavLink className="btn btn-secondary position-relative m-2" to={"/cart"}>
                            <BsFillCartCheckFill className="fs-5 mb-1" /> Cart
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                {totalQty}
                            </span>
                        </NavLink>
                    </div>

                </>
            )
        } else {//flag is false - login is not done
            return (
                <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/about"}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/contact"}>Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/products"}>Products</NavLink>
                        </li>

                    </ul>
                    <div className="nav-item text-end">
                        <NavLink className="btn btn-secondary" to={"/login"}>Login</NavLink>
                        <NavLink className="btn btn-secondary m-2" to={"/register"}>Registration</NavLink>
                        <NavLink className="btn btn-secondary position-relative" to={"/cart"}>
                            <BsFillCartCheckFill className="fs-5 mb-1" /> Cart
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                {totalQty}
                            </span>
                        </NavLink>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="container">

                <div className="header">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary">

                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Developers</a>

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <RenderMenu />
                            </div>
                        </div>
                    </nav>
                </div>

            </div>
        </>
    )
}

export default Header;