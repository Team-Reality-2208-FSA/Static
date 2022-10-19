import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    campuses: []
}

export const fetchCampusesAsync = createAsyncThunk("fetchCampusesAsync", async()=>{
    const { data } = await axios.get("api/campuses")
    return data
})


export const campusesSlice = createSlice({
    name: "campuses",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchCampusesAsync.fulfilled, (state, action)=>{
            console.log('DONE!')
            state.campuses = action.payload
            
        })
        builder.addCase(fetchCampusesAsync.pending, (state,action)=> {
            console.log("pending")
        })
    }
})
export const selectCampuses = (state) => {
    return state.campuses;
  };

export default campusesSlice.reducer