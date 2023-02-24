import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

type User = {
    name: string;
    email: string;
    avatar: string;
}

// Type for our state
export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

// Initial state
const initialState: AuthState =
    {
        isLoggedIn: false,
        user: null
    };

// Actual Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        // Action to set the authentication status
        setAuthState (state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
        }
    }
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state;

export default authSlice.reducer;
