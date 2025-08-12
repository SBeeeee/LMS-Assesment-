import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{}, 
    loading:false,
  };

  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setStudentId: (state, action) => {
        state.studentId = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
    },
  });
  
  export const { setStudentId, setLoading } = userSlice.actions;
  
  export default userSlice.reducer;


