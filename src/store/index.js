import { configureStore } from "@reduxjs/toolkit";
import FbiSlice from "./FBISlice";

// main redux store
const store = configureStore({
  reducer: {
    FBI: FbiSlice.reducer,
  },
});

export default store;
