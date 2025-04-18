import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationActions.jsx';
import confirmedNotificationReducer from './confirmedNotificationActions.jsx';
import userReducer from './userActions.jsx'
import cancelingNotifReducer from './cancelingNotification.Actions.jsx'


const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        confirmedNotifications: confirmedNotificationReducer,
        user: userReducer,
        cancelingNotif: cancelingNotifReducer


    },
});

export default store;
