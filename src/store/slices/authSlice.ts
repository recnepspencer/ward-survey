// src/store/slices/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, { configureAuthToken } from '@/utils/axiosConfig';

interface AuthState {
  authToken: string | null;
  user: User | null; // Define a User interface as needed
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authToken: null,
  user: null,
  loading: false,
  error: null,
};

// Define a User interface (adjust according to your User model)
interface User {
  id: string;
  email: string;
  name: string;
  // Add other fields as necessary
}

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken); // Store the token in local storage
      configureAuthToken(authToken); // Set token in Axios headers

      // Fetch user data after registration
      const userResponse = await axiosInstance.get('/api/user');
      const user: User = userResponse.data;

      return { authToken, user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', credentials);
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken); // Store the token in local storage
      configureAuthToken(authToken); // Set token in Axios headers

      // Fetch user data after login
      const userResponse = await axiosInstance.get('/api/user');
      const user: User = userResponse.data;

      return { authToken, user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Async thunk to fetch current user (useful for page refresh)
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/api/user');
      const user: User = response.data;
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authToken = null;
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('authToken'); // Remove the token from local storage
      configureAuthToken(null); // Remove token from Axios headers
    },
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ authToken: string; user: User }>) => {
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.loading = false;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ authToken: string; user: User }>) => {
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.loading = false;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    // Fetch Current User
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const { logout, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
