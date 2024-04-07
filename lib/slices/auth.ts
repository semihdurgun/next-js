'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    user: null | {
        name: string;
        email: string;
    };
}

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;