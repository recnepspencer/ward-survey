// src/components/JoinOrganization.tsx

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { joinOrganizationThunk } from '@/store/slices/organizationSlice';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const JoinOrganization: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [inviteToken, setInviteToken] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!inviteToken.trim()) {
      setError('Invitation token is required');
      return;
    }

    try {
      await dispatch(joinOrganizationThunk(inviteToken)).unwrap();
      setOpen(false);
      setInviteToken('');
      setError(null);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Join Organization
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Join an Organization</DialogTitle>
        <DialogContent>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <TextField
            label="Invitation Token"
            fullWidth
            margin="normal"
            value={inviteToken}
            onChange={(e) => setInviteToken(e.target.value)}
            placeholder="Enter your invitation token"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleJoin} variant="contained">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinOrganization;
