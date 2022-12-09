import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca



const initialState = {
    stateData: {},
    stateCrimes:{},
    filterBy:"",
    loading: true,
};

export const fetchStateData = createAsyncThunk("fetchStateData", async () => {
    const stateArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    const getStateStats = async (state) => {
        const { data } = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${state}/2020/2020?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)
        return data
    }
    return await Promise.all(stateArray.map((state) => {
        return getStateStats(state);
    }));
})

export const fetchStateDataByYear = createAsyncThunk("fetchStateDataByYear", async (obj) => {
    const stateArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    const getStateStats = async (state) => {
        const { data } = await axios.get(`https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${state}/${obj.year}/${obj.year}?API_KEY=uMb4ZhdgjKJqrGVqx7G3DhpOWbW2YFZ36iEgxRca`)
        return data
    }
    return await Promise.all(stateArray.map((state) => {
        return getStateStats(state);
    }))
})

export const stateDataSlice = createSlice({
    name: "stateData",
    initialState,
    reducers: {
        findCrimeData: {
            reducer: (state, action) => {
                const obj = action.payload.obj
                const id = obj.id
                const crimeRate = state.stateData[id-1].results[0].population/(state.stateData[id-1].results[0].violent_crime + state.stateData[id-1].results[0].property_crime)
                const data = {
                    data:state.stateData[id-1],
                    name:obj.state,
                    density:obj.density,
                    crimeRate: crimeRate
                }
                state.stateCrimes = data
            },
            prepare: (obj) => {
                return { payload: { obj } }
            }
        },
        filterCrimeData:{
            reducer:(state,action) => {
                console.log(action.payload,"In reducer")
                state.filterBy = action.payload
            },
            prepare:(str) =>{
                return {payload:str}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStateData.fulfilled, (state, action) => {
            state.stateData = action.payload;
            state.loading = false
        })
        builder.addCase(fetchStateDataByYear.pending, (state,action)=>{
            console.log("pending")
            state.loading = true
        })
        builder.addCase(fetchStateDataByYear.fulfilled, (state,action) => {
            console.log("reached builder case")
            console.log(action.payload)
            state.stateData = action.payload
            state.loading= false
        })
       
    }
})

export const selectStateData = (state) => {
    return state.stateData.stateData;
};

export const selectCrimes = (state) =>{
    return state.stateData.stateCrimes
}

export const crimeDataLoading = (state)=>{
    return state.stateData.loading
}

export const selectFilter = (state) =>{
    return state.stateData.filterBy
}

export const { findCrimeData, filterCrimeData } = stateDataSlice.actions




export default stateDataSlice;
