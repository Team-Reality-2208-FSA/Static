import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca



const initialState = {
    stateData: {}
};

export const fetchStateData = createAsyncThunk("fetchStateData", async () =>
{
    const stateArray = ["AL","AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA","RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
   

    const getStateStats = async (state) => {
        const {data} = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${state}/2020/2020?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)

    return data
        }

    return await Promise.all (stateArray.map( (state) => {
      return getStateStats(state);
     }));
    
    
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
