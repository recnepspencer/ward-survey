// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './slices/authSlice';
import organizationReducer from './slices/organizationSlice';
import surveyReducer from './slices/surveySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    survey: surveyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for dispatch with correct type
export const useAppDispatch = () => useDispatch<AppDispatch>();
