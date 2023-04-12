import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import PlayerReducer from "./features/playerSlice";
import { API } from "./services/api";
import { createWrapper } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
const logger = createLogger();

const makeStore = () =>
  configureStore({
    reducer: {
      [API.reducerPath]: API.reducer,
      [userSlice.name]: userSlice.reducer,
      player: PlayerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(API.middleware),
    // middleware: [logger, API.middleware],
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
