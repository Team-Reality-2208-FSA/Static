import { configureStore } from "@reduxjs/toolkit";


import CountySlice from "./CountySlice";
import fbiSlice from "./FBISlice";
import mapSlice from "./mapSlice";




// main redux store
const store = configureStore({
  reducer: {


    FBI: fbiSlice.reducer,
     Counties: CountySlice.reducer,
     map: mapSlice.reducer
  }

});


export default store;


