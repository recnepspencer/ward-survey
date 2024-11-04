// src/store/slices/organizationSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosConfig';

interface OrganizationState {
  organization: Organization | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organization: null,
  loading: false,
  error: null,
};

// Define an Organization interface (adjust according to your Organization model)
interface Organization {
  id: string;
  name: string;
  type: string;
  // Add other fields as necessary
}

// Thunk to create an organization
export const createOrganizationThunk = createAsyncThunk(
  'organization/createOrganization',
  async (data: { name: string; type: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/organization', data);
      return response.data as Organization;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to create organization'
      );
    }
  }
);

export const fetchOrganization = createAsyncThunk(
    'organization/fetchOrganization',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/api/organization');
        return response.data as Organization;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error || 'Failed to fetch organization'
        );
      }
    }
  );
  

// Thunk to join an organization
export const joinOrganizationThunk = createAsyncThunk(
  'organization/joinOrganization',
  async (inviteToken: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/organization/join', {
        token: inviteToken,
      });
      return response.data as Organization;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to join organization'
      );
    }
  }
);

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
      clearOrganization: (state) => {
        state.organization = null;
        state.error = null;
        state.loading = false;
      },
    },
    extraReducers: (builder) => {
      // Fetch Organization
      builder.addCase(fetchOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(
        fetchOrganization.fulfilled,
        (state, action: PayloadAction<Organization>) => {
          state.organization = action.payload;
          state.loading = false;
        }
      );
      builder.addCase(fetchOrganization.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  
      // Create Organization
      builder.addCase(createOrganizationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(
        createOrganizationThunk.fulfilled,
        (state, action: PayloadAction<Organization>) => {
          state.organization = action.payload;
          state.loading = false;
        }
      );
      builder.addCase(createOrganizationThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  
      // Join Organization
      builder.addCase(joinOrganizationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(
        joinOrganizationThunk.fulfilled,
        (state, action: PayloadAction<Organization>) => {
          state.organization = action.payload;
          state.loading = false;
        }
      );
      builder.addCase(joinOrganizationThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    },
  });
  

export const { clearOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;
