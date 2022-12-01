import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
    geoJson :{},
    counties:{},
    loading: true
}

export const fetchCounties = createAsyncThunk('fetchCounties', async (state)=>{
    console.log(state)
    const {data} = await axios.get(`/api/counties/${state}`)
    return data
})

export const fetchStats = createAsyncThunk('fetchStats', async (oriArray, to, from, offense)=>{
    const functionGetStats = async (ori, to,from,offense) =>{
        return await axios.get("link(ori.number)(to)(from)(offense)")
    }
    oriArray.map(async (ori)=> {
        arr.push(functionGetStats(ori))
    })
})

export const countiesSlice = createSlice({
    name:'counties',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchCounties.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(fetchCounties.fulfilled, (state,action)=>{
            state.geoJson = action.payload
            state.loading = false
        })
    }
})

export const selectGeoJson = (state)=>{
    return state.counties.geoJson
}

export const selectGeoLoading = (state) =>{
    return state.counties.loading
}

export default countiesSlice