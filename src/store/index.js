import { configureStore } from "@reduxjs/toolkit";


import countiesSlice from "./CountySlice";
import fbiSlice from "./FBISlice";
import mapSlice from "./mapSlice";
import graphSlice from "./GraphSlice";




// main redux store
const store = configureStore({
  reducer: {


    FBI: fbiSlice.reducer,
    counties: countiesSlice.reducer,
    map: mapSlice.reducer,
    Graphs: graphSlice.reducer,
  }

});


export default store;


