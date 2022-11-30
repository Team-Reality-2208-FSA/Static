import { configureStore } from "@reduxjs/toolkit";
import CountySlice from "./CountySlice";
import fbiSlice from "./FBISlice";


// main redux store
const store = configureStore({
  reducer: {
    FBI: fbiSlice.reducer,
     Counties: CountySlice.reducer
  },
});

export default store;


