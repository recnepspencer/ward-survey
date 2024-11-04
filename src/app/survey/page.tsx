// src/app/survey-list/page.tsx

'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { Container, Typography, Grid } from '@mui/material';
import SurveyListCard from '../Components/Survey/SurveyListCard/SurveyListCard';
import { fetchSurveys } from '@/store/slices/surveySlice';

const SurveyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { surveys } = useSelector((state: RootState) => state.survey);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 8, mb: 4 }}>
        Surveys
      </Typography>

      <Grid container spacing={3}>
        {surveys.map((survey) => (
          <Grid item xs={12} sm={6} md={4} key={survey.id}>
            <SurveyListCard 
              id={survey.id} 
              title={survey.title} 
              description={survey.description || 'No description available.'} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SurveyList;
