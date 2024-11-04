// src/components/CurrentOrganizationCard.tsx
import React from 'react';
import { Typography } from '@mui/material';
import { UniformCard, CardHeader, CardBody } from '../_Shared/UniformCard';

interface Organization {
  id: string;
  name: string;
  type: string;
}

interface Props {
  organization: Organization;
}

const CurrentOrganizationCard: React.FC<Props> = ({ organization }) => {
  return (
    <UniformCard>
      <CardHeader>
        <Typography variant="h5" gutterBottom>
          Your Organization
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {organization.name}
        </Typography>
        <Typography variant="body1">
          <strong>Type:</strong> {organization.type.charAt(0).toUpperCase() + organization.type.slice(1)}
        </Typography>
      </CardBody>
    </UniformCard>
  );
};

export default CurrentOrganizationCard;