import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: {}, // for user object
  error: null,
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    }
  },
  extraReducers: {}
});

export default authSlice.reducer;

export const { setUser, clearUser } = authSlice.actions;
