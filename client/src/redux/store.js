import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import PlayerReducer from './features/playerSlice';
import { API } from './services/api';
import { createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
const logger = createLogger();

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    [userSlice.name]: userSlice.reducer,
    player: PlayerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware).concat(logger),
  // middleware: [logger, API.middleware],
  devTools: true,
});

setupListeners(store.dispatch);

// export const wrapper = createWrapper(store);
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
