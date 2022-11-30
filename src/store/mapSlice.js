import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
    
}

export const fetchFeatures = createAsyncThunk("fetchFeatures", async ()=>{
    // const statesData = await axios.get('.../states.js')
    // console.log(statesData)
    
})

// student slice and reducers for setting state
export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchFeatures.fulfilled, (state, action)=>{
           
        })
    }
})


//selectors for retrieving state
export default mapSlice