import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'

const rootStore = configureStore({
    reducer : {
        cart : cartSlice,
        auth : authSlice
    }
})

export default rootStore;