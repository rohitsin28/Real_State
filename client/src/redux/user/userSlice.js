import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.CurrentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.CurrentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (start) => {
        start.loading = true
    },
    deleteUserSuccess: (state,action) => {
        state.CurrentUser = null;
        state.loading = false;
        state.error = null;
    },
    deleteUserFailed: (state,action) => {
        state.error = action.payload;
        action.loading = false
    },
    signOutUserStart: (start) => {
        start.loading = true
    },
    signOutUserSuccess: (state,action) => {
        state.CurrentUser = null;
        state.loading = false;
        state.error = null;
    },
    signOutUserFailed: (state,action) => {
        state.error = action.payload;
        action.loading = false
    }
  },
});

export const {
  SignInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailed,
  signOutUserStart,
  signOutUserSuccess
} = userSlice.actions;
export default userSlice.reducer;
