import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userSlice, { middleware } from "./user";

export type AppStore = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<AppStore>(), middleware] as const,
});

export default store;
