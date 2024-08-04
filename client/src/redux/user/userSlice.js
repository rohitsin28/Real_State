import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    CurrentUser: null,
    error: null,
    loading: null
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        SignInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.CurrentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {SignInStart,signInSuccess,signInFailure} = userSlice.actions;
export default userSlice.reducer;