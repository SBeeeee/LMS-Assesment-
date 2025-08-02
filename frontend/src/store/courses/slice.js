import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  activeTab:'all'
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setTab:(state,action)=>{
      state.activeTab=action.payload;
    }
  },
});

export const { setCourses,setTab } = courseSlice.actions;

export default courseSlice.reducer;
