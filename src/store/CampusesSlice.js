import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    campuses: [],
    campus: {}
}

export const fetchCampusesAsync = createAsyncThunk("fetchCampusesAsync", async ()=>{
    const { data } = await axios.get("/api/campuses")
    return data
})

export const fetchSingleCampus = createAsyncThunk("fetchSingleCampus", async (id)=> {
    
    const { data }  = await axios.get(`/api/campuses/${id}`)
    console.log("fetchSingleCampus firing", data)
    return data
} )


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
        builder.addCase(fetchSingleCampus.pending, (state,action)=>{
            console.log("pending")
        })
        builder.addCase(fetchSingleCampus.fulfilled, (state, action)=>{
            console.log('DONE!')
            state.campus = action.payload
            
        })
    }
})
export const selectCampuses = (state) => {
    return state.campuses;
};

export const selectCampus = (state) => {
    return state.campuses.campus
}

export default campusesSlice.reducer