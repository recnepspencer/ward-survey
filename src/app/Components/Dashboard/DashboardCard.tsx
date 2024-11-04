// src/components/DashboardCard.tsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import { UniformCard, CardHeader, CardBody, CardFooter } from '../_Shared/UniformCard';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <UniformCard>
      <CardHeader>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardBody>
      {buttonText && onButtonClick && (
        <CardFooter>
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            fullWidth
            sx={{ maxWidth: 150 }}
          >
            {buttonText}
          </Button>
        </CardFooter>
      )}
    </UniformCard>
  );
};

export default DashboardCard;