import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca

const initialState = {
Counties: []


};

export const fetchFBI = createAsyncThunk("fetchFBI", async (userState) =>
{
    const {data} = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/${userState}?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)
   
    return data
})



export const fbiSlice = createSlice({
    name: "FBI",
    initialState,
    reducers: {
        


    },
    extraReducers: (builder) => {
        builder.addCase(fetchFBI.fulfilled, (state, action) => {
            const FBI = action.payload
            let MultiCounties = FBI.results.map((result) => result.county_name)
            let SingleCounties = MultiCounties.filter((item, i, County) => County.indexOf(item) === i)

             state.Counties = SingleCounties
            
        }
        )}
        })

        export const selectFBI = (state) => {
            return state.FBI.Counties;
          };


export default fbiSlice;