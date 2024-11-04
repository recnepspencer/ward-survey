// src/components/CreateOrganization.tsx

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { createOrganizationThunk } from '@/store/slices/organizationSlice';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from '@mui/material';

const CreateOrganization: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [orgType, setOrgType] = useState<'ward' | 'stake' | 'area'>('ward');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!orgName.trim()) {
      setError('Organization name is required');
      return;
    }

    try {
      await dispatch(createOrganizationThunk({ name: orgName, type: orgType })).unwrap();
      setOpen(false);
      setOrgName('');
      setOrgType('ward');
      setError(null);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
        Create Organization
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create an Organization</DialogTitle>
        <DialogContent>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel id="org-type-label">Organization Type</InputLabel>
            <Select
              labelId="org-type-label"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value as 'ward' | 'stake' | 'area')}
              label="Organization Type"
            >
              <MenuItem value="ward">Ward</MenuItem>
              <MenuItem value="stake">Stake</MenuItem>
              <MenuItem value="area">Area</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={`Name of the ${orgType}`}
            fullWidth
            margin="normal"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder={`Enter the name of your ${orgType}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateOrganization;
