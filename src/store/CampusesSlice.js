import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampusesAsync = createAsyncThunk("campuses/fetchCampuses", async()=>{
    const { data } = await axios.get("api/campuses")
    return data
})


export const CampusesSlice = createSlice({
    name: "campuses",
    initialState: [],
    reducers: {

    },
    extraReducer:(builder)=>{
        builder.addCase(fetchCampusesAsync.fulfilled, (state, action)=>{
            state = action.payload
        })
    }
})
export const selectCampuses = (state) => state;

export const campuses = CampusesSlice.reducer