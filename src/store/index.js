import { configureStore } from "@reduxjs/toolkit";


import countiesSlice from "./CountySlice";
import fbiSlice from "./FBISlice";
import mapSlice from "./mapSlice";
import graphSlice from "./GraphSlice";
import stateDataSlice from "./stateDataslice";





// main redux store
const store = configureStore({
  reducer: {


    FBI: fbiSlice.reducer,
    counties: countiesSlice.reducer,

    map: mapSlice.reducer,
    Graphs: graphSlice.reducer,
 stateData: stateDataSlice.reducer

  }

});


export default store;


