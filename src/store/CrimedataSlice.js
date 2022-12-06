import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchStats = createAsyncThunk(
  "fetchStats",
  async ({ oris, offense, from, to }) => {
    

  const arr = []

    const functionGetStats = async (ori, offense, from, to) => {
      const results = await axios.get(
        `https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/${ori}/${offense}/${from}/${to}?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`
      );
     
      return results;
    };

  await Promise.all (oris.map( (ori) => {
       arr.push(functionGetStats(ori, offense, from, to));
    }));
   console.log(arr)
    return arr
  }
);

export const crimeDataSlice = createSlice({
  name: "crimeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.crimeData = action.payload;
     
    });
  
  },
});

export const selectCrimeData = (state) => {
  return state.crimeData;
  
};

export default crimeDataSlice;
