// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { Container, Typography, Box, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { logout, fetchCurrentUser } from '@/store/slices/authSlice';
import { fetchOrganization } from '@/store/slices/organizationSlice';
import CreateSurvey from '../Components/Survey/Create/CreateSurvey';
import CreateOrJoinCard from '../Components/Organization/CreateOrJoinCard';
import CurrentOrganizationCard from '../Components/Organization/CurrentOrganizationCard';
import DashboardCard from '../Components/Dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authToken, user, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const { organization, loading: orgLoading } = useSelector((state: RootState) => state.organization);
  const [openCreateSurvey, setOpenCreateSurvey] = useState(false);

  useEffect(() => {
    if (authToken) {
      dispatch(fetchCurrentUser());
      dispatch(fetchOrganization());
    }
  }, [authToken, dispatch]);

  useEffect(() => {
    if (!authToken) {
      router.push('/login');
    }
  }, [authToken, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (authLoading || orgLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4">Welcome {user?.name || 'to the Dashboard'}</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          {organization ? (
            <CurrentOrganizationCard organization={organization} />
          ) : (
            <CreateOrJoinCard />
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Create Survey"
            description="Start a new survey for your organization."
            buttonText="Create Survey"
            onButtonClick={() => setOpenCreateSurvey(true)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Survey List"
            description="View all surveys and their results."
            buttonText="View Surveys"
            onButtonClick={() => router.push('/survey-list')}
          />
        </Grid>
      </Grid>

      <Dialog 
        open={openCreateSurvey} 
        onClose={() => setOpenCreateSurvey(false)} 
        fullWidth 
        maxWidth="md"
      >
        <DialogTitle>Create a New Survey</DialogTitle>
        <DialogContent>
          <CreateSurvey onClose={() => setOpenCreateSurvey(false)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Dashboard;