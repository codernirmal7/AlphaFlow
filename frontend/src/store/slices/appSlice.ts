import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Task, Transaction, Notification } from '../../types';
import { mockTasks, mockTransactions, mockReferrals, mockNotifications, plans } from '../../constant/index';

const initialState: AppState = {
    tasks: mockTasks,
    plans: plans,
    transactions: mockTransactions,
    referrals: mockReferrals,
    notifications: mockNotifications,
    loading: false,
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: Task['status'] }>) => {
            const task = state.tasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.status = action.payload.status;
            }
        },
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.unshift(action.payload);
        },
        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
            }
        },
        markAllNotificationsAsRead: (state) => {
            state.notifications.forEach(n => n.read = true);
        },
    },
});

export const {
    setLoading,
    setError,
    updateTaskStatus,
    addTransaction,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} = appSlice.actions;

export default appSlice.reducer;