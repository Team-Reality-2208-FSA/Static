import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca

const initialState = {};

export const fetchFBI = createAsyncThunk("fetchFBI", async (userState) =>
{
    const {data} = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/${userState}?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)
    console.log(data)
    return data
})



export const fbiSlice = createSlice({
    name: "FBI",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFBI.fulfilled, (state, action) => {
    
            state.FBI = action.payload
        }
        )}
        })

        export const selectFBI = (state) => {
            return state.FBI;
          };


export default fbiSlice;