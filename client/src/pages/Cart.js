import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShowCart from "../components/ShowCart";
import { getTotal } from "../store/slices/cartSlice";

const Cart=()=>{

    const cart = useSelector(state=>state.cart)
    const cartItems = useSelector(state=>state.cart.cartItems)
    const totalAmt = useSelector(state=>state.cart.totalAmt)
    const totalQty = useSelector(state=>state.cart.totalQty)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTotal())
    },[dispatch,cart,cartItems,totalAmt,totalQty])

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="cart-holder">

                        {
                           cartItems.length > 0 ?  <ShowCart cartItems={cartItems} totalAmt={totalAmt} totalQty={totalQty} />: <div className="text-center fs-5 mt-3">Cart is Empty</div>

                        }

                    </div>
                </div>
            </div>
        </>
    )
}


export default Cart;