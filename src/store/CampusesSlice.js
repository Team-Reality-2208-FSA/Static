import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    campuses: [],
    campus: {},
    loading: true
}

export const fetchCampusesAsync = createAsyncThunk("fetchCampusesAsync", async ()=>{
    const { data } = await axios.get("/api/campuses")
    return data
})

export const fetchSingleCampus = createAsyncThunk("fetchSingleCampus", async (id)=> {
    const { data }  = await axios.get(`/api/campuses/${id}`)
    return data
} )
export const postCampus = createAsyncThunk("postCampus", async (sub)=>{
    console.log("sending ajax post request", sub)
    const { data } = await axios.post("/api/campuses", sub)
    console.log("data received from Ajax request", data)
    return data
})

export const campusesSlice = createSlice({
    name: "campuses",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchCampusesAsync.fulfilled, (state, action)=>{
            //console.log('Campuses aqquired!')
            state.campuses = action.payload
            state.loading = false
            
        })
        builder.addCase(fetchCampusesAsync.pending, (state,action)=> {
            //console.log("Campuses is pending")
            state.loading = true
        })
        builder.addCase(fetchSingleCampus.pending, (state,action)=>{
            //console.log("Campus is pending")
            state.loading = true
        })
        builder.addCase(fetchSingleCampus.fulfilled, (state, action)=>{
            console.log('Campus aqquired!')
            state.loading = false
            state.campus = action.payload
        })
        builder.addCase(postCampus.fulfilled, (state,action)=>{
            state.campuses.push(action.payload)
        })
    }
})
export const selectCampuses = (state) => {
    return state.campuses;
};

export const selectCampus = (state) => {
    return state.campuses.campus
}

export const studentsOfCampus = (state) => {
    return state.campuses.campus.Students
}

export const isLoading = (state) => {
    return state.campuses.loading
}

export default campusesSlice.reducer