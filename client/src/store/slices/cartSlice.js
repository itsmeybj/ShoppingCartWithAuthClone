import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    totalQty: 0,
    totalAmt: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            //console.log(action.payload);
            //-1 means - not match else match

            const cartItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

            if (cartItemIndex >= 0) {
                //this means product is already added
                state.cartItems[cartItemIndex].cartQty += 1;
                state.cartItems[cartItemIndex].updatedPrice += action.payload.price;
                //console.log(state.cartItems[cartItemIndex].updatedPrice);
                toast.info(`${action.payload.title} is added to the cart again!`,
                { position: 'bottom-right' })
            }
            else {
                //this means product first time to add
                const tempProduct = { ...action.payload, cartQty: 1, updatedPrice : action.payload.price }
                
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} is added to the cart!`,
                { position: 'bottom-right' })
            }
            //state.cartQty = 10000;

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        deleteCart(state, action) {
            state.cartItems = state.cartItems.filter(ele => ele.id !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.error(`${action.payload.title} is removed from the cart!`,
            { position: 'bottom-right' })
          },
        deleteAllCart(state, action) {
            state.cartItems = []
            toast.error(`The cart is cleared!`, { position: 'bottom-right' });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        increaseCartQty(state, action) {
            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload)
            //console.log(cartItemIndex);
            state.cartItems[cartItemIndex].cartQty += 1;
            //console.log(state.cartItems[cartItemIndex  ]);
            state.cartItems[cartItemIndex].updatedPrice += state.cartItems[cartItemIndex].price
            //console.log(state.cartItems[cartItemIndex].updatedPrice);
            //console.log(state.cartItems[cartItemIndex].price);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        decreaseCartQty(state, action) {
            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload)
            //console.log(cartItemIndex);
            if (state.cartItems[cartItemIndex].cartQty > 1) {
                state.cartItems[cartItemIndex].cartQty -= 1;
                state.cartItems[cartItemIndex].updatedPrice -= state.cartItems[cartItemIndex].price
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotal(state) {
            let { total, qty } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { updatedPrice, cartQty } = cartItem;
                cartTotal.total += updatedPrice;
                cartTotal.qty += cartQty;
                return cartTotal;
            }, {
                total: 0,
                qty: 0,
            })
            state.totalQty = qty;
            state.totalAmt = total;
        },
        
    }
})

export default cartSlice.reducer;

export const { addToCart, deleteAllCart, deleteCart, increaseCartQty, decreaseCartQty, getTotal } = cartSlice.actions;