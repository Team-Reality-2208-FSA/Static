import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
     GraphData: [], 
    
    };

export const fetchGraphInfo = createAsyncThunk("fetchFBI", async (userState) =>
{
    const {data} = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${userState}/2015/2020?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)
 
    return data
})
export const graphSlice = createSlice({
    name: "Graphs",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGraphInfo.fulfilled, (state, action) => {
                return state = action.payload
            
})
}

})

export const selectGraph = (state) => {
    
    return state.Graphs

  }


export default graphSlice;