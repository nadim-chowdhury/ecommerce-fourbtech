import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "./slices/demoSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    demo: demoReducer,
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Types for usage in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
