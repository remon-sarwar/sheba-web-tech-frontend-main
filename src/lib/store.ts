import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';
import authSlice from './features/authSlice';
import cartSlice from './features/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      cart: cartSlice,
      auth: authSlice
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
