import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


const initialState = {
    allCounties: {},
    counties: {type: 'FeatureCollection', features:[]},
    loading: true,
    toggle: false
}

export const fetchAllCounties = createAsyncThunk('fetchAllCounties', async () => {
    const { data } = await axios.get(`/api/counties/all`)
    return data
})



// export const fetchStats = createAsyncThunk('fetchStats', async (oriArray, to, from, offense)=>{
//     const functionGetStats = async (ori, to,from,offense) =>{
//         return await axios.get("link(ori.number)(to)(from)(offense)")
//     }
//     oriArray.map(async (ori)=> {
//         arr.push(functionGetStats(ori))
//     })
// })

export const countiesSlice = createSlice({
    name: 'counties',
    initialState,
    reducers: {
        findCounties: {
            reducer: (state, action) => {
                const id = action.payload.id
                const obj = {
                    type: state.allCounties.type,
                    features: [...state.allCounties.features]
                }
                if (id !== null) {
                    obj.features = obj.features.filter((feature) => {
                        return feature.properties.STATE === id
                    })
                    state.counties = obj
                    state.toggle = true
                } else {
                    obj.features = []
                    state.counties = obj
                    state.toggle = false
                }
                
            },
            prepare: (id) => {
                return { payload: { id } }
            }
        },
        changeToggle(state){
          state.loading = false    
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCounties.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllCounties.fulfilled, (state, action) => {
            state.allCounties = action.payload
            state.loading = false
        })
    }
})

export const selectGeoJson = (state) => {
    return state.counties.allCounties
}

export const selectGeoLoading = (state) => {
    return state.counties.loading
}

export const selectCounties = (state) => {
    return state.counties.counties
}

export const selectToggle = (state)=>{
    return state.counties.toggle
}

export const { findCounties, changeToggle } = countiesSlice.actions
export default countiesSlice