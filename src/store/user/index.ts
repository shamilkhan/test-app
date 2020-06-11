import { createSlice } from "@reduxjs/toolkit";

type State = typeof initialState;

const initialState = Object.freeze({
  token: null as string | null,
});

const slice = createSlice({
  name: "user",
  reducers: {
    login: (store, { payload: { token } }) => {
      return { token };
    },
    logout: () => {
      return { ...initialState };
    },
  },
  initialState,
});

export const { login, logout } = slice.actions;

export default slice;
