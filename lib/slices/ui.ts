'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
    isCollapse: null | boolean;
}

const initialState: UIState = {
    isCollapse: null,
};

export const uiSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCollapse: (state, action: PayloadAction<boolean>) => {
            state.isCollapse = action.payload;
        },
        setToggleCollapse: (state) => {
            state.isCollapse = !state.isCollapse;
        }
    },
});

export const { setCollapse, setToggleCollapse } = uiSlice.actions;

export default uiSlice.reducer;