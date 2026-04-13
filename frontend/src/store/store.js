// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // add more slices here as app grows
  },
});

export default store;