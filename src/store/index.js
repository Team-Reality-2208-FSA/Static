/* Here is where you will configure the store 
    The store needs some reducer slices!
*/

import { configureStore } from '@reduxjs/toolkit'
import { campuses } from './CampusesSlice'

const store = configureStore({
  reducer: {
    Allcampuses: campuses
  },
})

export default store
