import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: [],
        error: '',
    },
    reducers: {
        getUserData: (state) => {
            state.isLoading = true;
        },
        userSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        },
        userFail: (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.payload;
        },
    },
});

// Export actions
export const { getUserData, userSuccess, userFail } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
