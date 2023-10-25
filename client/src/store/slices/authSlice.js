import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const initialState = {
    flag : false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStatus(state,action){
            state.flag = action.payload
        },
    }
})

export default authSlice.reducer;

export const {loginStatus } = authSlice.actions;