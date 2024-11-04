// src/components/Survey/SurveyListCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SurveyListCardProps {
  id: string;
  title: string;
  description: string;
}

const SurveyListCard: React.FC<SurveyListCardProps> = ({ id, title, description }) => {
  const router = useRouter();

  const handleViewSurvey = () => {
    router.push(`/survey/${id}`);
  };

  const handleViewResults = () => {
    router.push(`/survey/${id}/results`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom align="left">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="left" paragraph>
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewSurvey}
            sx={{ width: '100%', maxWidth: 150 }}
          >
            View Survey
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewResults}
            sx={{ width: '100%', maxWidth: 150 }}
          >
            View Results
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default SurveyListCard;
