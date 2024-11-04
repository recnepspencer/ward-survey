// src/components/CreateOrJoinCard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Typography, Box } from '@mui/material';
import { UniformCard, CardHeader, CardBody } from '../_Shared/UniformCard';
import CurrentOrganizationCard from './CurrentOrganizationCard';
import CreateOrganization from './CreateOrganization';
import JoinOrganization from './JoinOrganization';

const CreateOrJoinCard: React.FC = () => {
  const organization = useSelector((state: RootState) => state.organization.organization);
  const loading = useSelector((state: RootState) => state.organization.loading);
  const error = useSelector((state: RootState) => state.organization.error);

  if (loading) {
    return (
      <UniformCard>
        <CardBody>
          <Typography variant="h6">Loading...</Typography>
        </CardBody>
      </UniformCard>
    );
  }

  if (organization) {
    return <CurrentOrganizationCard organization={organization} />;
  }

  return (
    <UniformCard>
      <CardHeader>
        <Typography variant="h5" gutterBottom>
          Get Started
        </Typography>
      </CardHeader>
      <CardBody>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <CreateOrganization />
        <Box sx={{ mt: 2 }}>
          <JoinOrganization />
        </Box>
      </CardBody>
    </UniformCard>
  );
};

export default CreateOrJoinCard;