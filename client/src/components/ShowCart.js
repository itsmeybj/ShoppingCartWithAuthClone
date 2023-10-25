import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { decreaseCartQty, deleteAllCart, deleteCart, increaseCartQty } from "../store/slices/cartSlice";

const ShowCart = (props) => {

    const { cartItems,totalAmt,totalQty } = props

    const dispatch = useDispatch()

    return (
        <>
            <table className="table table-bordered mt-3">
                <tr ><th className="m-3">Sr.No</th><th>Product Name</th><th>Quntity</th><th>Orignal Price</th>Total<th></th><th>Actions</th></tr>
                {
                    cartItems.map((cart) => {
                        return (
                            <tr>
                                <td>{cart.id}</td>
                                <td>{cart.title}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" onClick={()=>dispatch(increaseCartQty(cart.id))} className="btn btn-secondary">+</button>
                                        <button type="button" className="btn btn-secondary">{cart.cartQty}</button>
                                        <button type="button" onClick={()=>dispatch(decreaseCartQty(cart.id))} className="btn btn-secondary">-</button>
                                    </div>
                                </td>
                                <td>${(cart.price).toFixed(2)}</td>
                                <td>${(cart.updatedPrice).toFixed(2)}</td>
                                <td><button onClick={() => dispatch(deleteCart(cart.id))} className="btn btn-danger m-3">Delete</button></td>
                                
                            </tr>
                        )
                    })
            
                }
                <tr>
                    <td></td>
                    <td>Total Qty : {totalQty}</td>
                    <td></td>
                    <td></td>
                    <td>Total : {totalAmt.toFixed(2)}</td>
                    <td></td>
                </tr>
            </table>
            <div className="text-end">
                <button className="btn btn-danger" onClick={() => dispatch(deleteAllCart())}>Empty Cart</button>
            </div>
        </>
    )
}

export default ShowCart;