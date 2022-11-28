
import { configureStore } from '@reduxjs/toolkit'
import FBISlice from './FBISlice'


// main redux store
const store = configureStore({
  reducer: {
    FBI: FBISlice,
    
    
  },
})

export default store
