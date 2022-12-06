import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca

const initialState = {
};

export const fetchStateData = createAsyncThunk("fetchStateData", async (userState) =>
{
    const {data} = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${userState}}/2019/2020?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)
   
    return data
})



export const stateDataSlice = createSlice({
    name: "stateData",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStateData.fulfilled, (state, action) => {
            
            state.stateData = action.payload;
            }
        )}
        })

        export const selectStateData = (state) => {
            return state.stateData;
          };
          
   


export default stateDataSlice;
