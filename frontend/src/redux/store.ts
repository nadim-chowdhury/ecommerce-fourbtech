import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "./slices/demoSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    demo: demoReducer,
    user: userReducer,
  },
});

// Types for usage in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
