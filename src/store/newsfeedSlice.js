import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// API KEY = "5e91aafce4274eeda3db36c52aa339eb"


const initialState = {};
    
    export const fetchNewsFeed = createAsyncThunk("fetchNewsFeed", async () =>
    {
        const {data} = await axios.get(`https://newsapi.org/v2/everything?q=crime&from=2022-12-07&sortBy=popularity&apiKey=5e91aafce4274eeda3db36c52aa339eb`)
     
        return data;
    });

    export const newsFeedSlice = createSlice({
        name: "newsfeed",
        initialState,
        reducers: {},
        extraReducers: (builder)=>{
            builder.addCase(fetchNewsFeed.fulfilled, (state, action)=>{
               
                state.newsFeed = action.payload;
            })
        }
    });

    export const selectNewsFeed = (state) => {
        return state.newsfeed;
      };

      export default newsFeedSlice;