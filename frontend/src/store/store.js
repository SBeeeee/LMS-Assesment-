import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/slice'
import courseReducer from './courses/slice'
import enrollmentReducer from './enrollments/slice'

export const store=configureStore({
    reducer:{
        course:courseReducer,
        enroll:enrollmentReducer,
        user:userReducer,
    }
})

export default store;