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
    console.log("fetch campuses firing")
    const { data }  = await axios.get(`/api/campuses/${id}`)
    return data
} )
export const postCampus = createAsyncThunk("postCampus", async (sub)=>{
    console.log("sending ajax post request", sub)
    const { data } = await axios.post("/api/campuses", sub)
    console.log("data received from Ajax request", data)
    return data
})

export const deleteCampus = createAsyncThunk("deleteCampus", async (id)=>{
    const { data } = await axios.get(`api/campuses/${id}`)
    await axios.delete(`/api/campuses/${id}`)
    return data
})

export const campusesSlice = createSlice({
    name: "campuses",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchCampusesAsync.pending, (state,action)=> {
            //console.log("Campuses is pending")
            state.loading = true
        })
        builder.addCase(fetchCampusesAsync.fulfilled, (state, action)=>{
            //console.log('Campuses aqquired!')
            state.campuses = action.payload
            state.loading = false
            
        })
        builder.addCase(fetchSingleCampus.pending, (state,action)=>{
            //console.log("Campus is pending")
            state.loading = true
        })
        builder.addCase(fetchSingleCampus.fulfilled, (state, action)=>{
            //console.log('Campus aqquired!')
            state.loading = false
            state.campus = action.payload
           
        })
        builder.addCase(postCampus.fulfilled, (state,action)=>{
            //console.log(state.campuses.campuses)
            state.campuses.push(action.payload)
            
        })
        builder.addCase(deleteCampus.fulfilled, (state,action)=>{
            // actiion payload i scorrect campus that got deleted from db
            console.log(state.campuses)
            const newCampuses = state.campuses.filter((obj)=>{
                if(obj.id !== action.payload.id) {
                    return obj
                }
            })
            state.campuses = newCampuses
        })
    }
})
export const selectCampuses = (state) => {
    return state.campuses.campuses;
};

export const selectCampus = (state) => {
    return state.campuses.campus
}

export const isLoading = (state) => {
    return state.campuses.loading
}

export default campusesSlice.reducer