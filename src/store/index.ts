import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
