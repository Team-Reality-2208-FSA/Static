import { configureStore } from "@reduxjs/toolkit";
import FbiSlice from "./FBISlice";
import mapSlice from "./mapSlice";

// main redux store
const store = configureStore({
  reducer: {
    FBI: FbiSlice.reducer,
    map: mapSlice.reducer
  },
});

export default store;
