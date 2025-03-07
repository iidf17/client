import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './slices/userSlice';
import { administrationReducer } from "./slices/administrationSlices";
import { departmentsReducer } from "./slices/departmentsSlices";

export const store = configureStore({
    reducer: {
        administration: administrationReducer,
        departments: departmentsReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
