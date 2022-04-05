import { configureStore } from '@reduxjs/toolkit';
import authentication from './auth';

export const store = configureStore({
    reducer: {
        auth: authentication,
    },
  });