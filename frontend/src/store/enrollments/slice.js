import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledCourses: [],
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  },
});

export const { setEnrolledCourses } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
