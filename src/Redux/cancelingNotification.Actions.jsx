import { createSlice } from '@reduxjs/toolkit';

const cancelingNotificationSlice = createSlice({
    name: 'cancelingNotif',
    initialState: {
        isLoading: true,
        data: [],
        error: '',
    },
    reducers: {
        getCancelingData: (state) => {
            state.isLoading = true;
        },
        CancelingSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        },
        CancelingFail: (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.payload;
        },
    },
});

// Export actions
export const { getCancelingData, CancelingSuccess, CancelingFail } = cancelingNotificationSlice.actions;

// Export reducer
export default cancelingNotificationSlice.reducer;
