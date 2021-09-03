import { configureStore } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

export const store = configureStore({
    reducer: reducer,
    preloadedState: initialState
})