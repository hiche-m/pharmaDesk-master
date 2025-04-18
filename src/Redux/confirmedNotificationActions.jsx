/* import { createSlice } from '@reduxjs/toolkit';
import { notification_load_limit } from '../Utils/Parameters.jsx';

const confirmedNotificationsSlice = createSlice({
    name: 'confirmedNotifications',
    initialState: {
        isLoading: true,
        data: [],
        error: '',
        index: notification_load_limit
    },
    reducers: {
        getConfirmedNotifications: (state) => {
            state.isLoading = true;
        },
        confirmedNotificationSuccess: (state, action) => {
            state.isLoading = false;

            // Add only notifications with unique Idprescription values
            const newNotifications = action.payload.filter(notification => {
                // Check if the Idprescription already exists in the data
                return !state.data.some(existingNotification => existingNotification.Idprescription === notification.Idprescription);
            });

            // Append the unique notifications to the existing data
            state.data = [...state.data, ...newNotifications];
            state.error = '';
        },
        confirmedNotificationFail: (state, action) => {
            state.isLoading = false;
            state.data = [];  // Clear data on failure
            state.error = action.payload;
        },
        loadMore: (state, action) => {
            // Adjust the index and slice to load more data
            state.data = state.data.slice(0, action.payload + notification_load_limit);
            state.index = action.payload + state.index;
        },
    },
});

// Export actions
export const { getConfirmedNotifications, confirmedNotificationSuccess, confirmedNotificationFail, loadMore } = confirmedNotificationsSlice.actions;

// Export reducer
export default confirmedNotificationsSlice.reducer;
 */

import { createSlice } from '@reduxjs/toolkit';
import { notification_load_limit } from '../Utils/Parameters.jsx';

const confirmedNotificationsSlice = createSlice({
    name: 'confirmedNotifications',
    initialState: {
        isLoading: true,
        data: [],
        error: '',
        index: notification_load_limit
    },
    reducers: {
        getConfirmedNotifications: (state) => {
            state.isLoading = true;
        },
        confirmedNotificationSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        },
        confirmedNotificationFail: (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.payload;
        },
        loadMore: (state, action) => {
            state.data = state.data.slice(0, action.payload + notification_load_limit);
            state.index = action.payload + state.index;
        },
    },
});

// Export actions
export const { getConfirmedNotifications, confirmedNotificationSuccess, confirmedNotificationFail, loadMore } = confirmedNotificationsSlice.actions;

// Export reducer
export default confirmedNotificationsSlice.reducer;