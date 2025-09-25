import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/index';
import { mockUser } from '../../constant';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError } = authSlice.actions;

// Thunk for mock login
export const mockLogin = (email: string, password: string) => (dispatch: any) => {
    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
        if (email === 'demo@earnhub.com' && password === 'demo123') {
            dispatch(loginSuccess(mockUser));
        } else {
            dispatch(loginFailure('Invalid email or password'));
        }
    }, 1000);
};

export default authSlice.reducer;