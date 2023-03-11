import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { itemSlice } from "./itemSlice";
import { userSlice } from "./userSlice";
import { createWrapper } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
const logger = createLogger();

const makeStore = () =>
  configureStore({
    reducer: {
      [itemSlice.name]: itemSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    middleware: [logger],
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
