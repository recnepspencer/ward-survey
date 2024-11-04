// src/store/slices/surveySlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosConfig';
import { Survey } from '@prisma/client'; // Ensure this type aligns with your Prisma schema

interface SurveyState {
  surveys: Survey[];
  loading: boolean;
  error: string | null;
}

const initialState: SurveyState = {
  surveys: [],
  loading: false,
  error: null,
};

// Async thunk to create a survey
export const createSurvey = createAsyncThunk(
  'survey/createSurvey',
  async (data: { title: string; description?: string; questions: any[] }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/survey', data);
      return response.data as Survey;
    } catch (error: any) {
      // Return a rejected action with a custom error message
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to create survey'
      );
    }
  }
);

// Async thunk to fetch all surveys (optional, but useful)
export const fetchSurveys = createAsyncThunk(
  'survey/fetchSurveys',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/api/survey');
      return response.data as Survey[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to fetch surveys'
      );
    }
  }
);

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
  },
  extraReducers: (builder) => {
    // Handle createSurvey
    builder.addCase(createSurvey.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createSurvey.fulfilled, (state, action: PayloadAction<Survey>) => {
      state.surveys.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle fetchSurveys
    builder.addCase(fetchSurveys.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSurveys.fulfilled, (state, action: PayloadAction<Survey[]>) => {
      state.surveys = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSurveys.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default surveySlice.reducer;
