import { configureStore } from "@reduxjs/toolkit";


import countiesSlice from "./CountySlice";
import fbiSlice from "./FBISlice";
import mapSlice from "./mapSlice";




// main redux store
const store = configureStore({
  reducer: {


    FBI: fbiSlice.reducer,
    counties: countiesSlice.reducer,
    map: mapSlice.reducer
  }

});


export default store;


