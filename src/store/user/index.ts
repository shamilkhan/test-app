import { createSlice, Middleware } from "@reduxjs/toolkit";
import { AppStore, AppDispatch } from "..";

const initialState = Object.freeze({
  token: localStorage.getItem("token") || "",
});

const slice = createSlice({
  name: "user",
  reducers: {
    login: (store, { payload: { token } }) => {
      return { token };
    },
    logout: () => {
      return { token: "" };
    },
  },
  initialState,
});

export const { login, logout } = slice.actions;

//@ts-ignore
export const middleware = (store) => (next) => (action) => {
  if (action.type === login.type) {
    localStorage.setItem("token", action.payload.token);
  } else if (action.type === logout.type) {
    localStorage.removeItem("token");
  }
  next(action);
};

export default slice;
