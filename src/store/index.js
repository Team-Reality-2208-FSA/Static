/* Here is where you will configure the store 
    The store needs some reducer slices!
*/

import { configureStore } from '@reduxjs/toolkit'
import campusesSlice from './campusesSlice'
import studentsSlice  from './studentsSlice'

// main redux store
const store = configureStore({
  reducer: {
    campuses: campusesSlice,
    students: studentsSlice
  },
})

export default store
