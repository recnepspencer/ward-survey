// src/app/survey-list/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, Box, Typography, Button, TextField, FormControlLabel, Checkbox, Radio, RadioGroup } from '@mui/material';
import axiosInstance from '@/utils/axiosConfig';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'single_select' | 'multi_select' | 'likert';
  options?: { text: string }[];
}

interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

const SurveyPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axiosInstance.get(`/api/survey?id=${id}`);
        setSurvey(response.data);
      } catch (error) {
        console.error('Failed to fetch survey:', error);
      }
    };
    fetchSurvey();
  }, [id]);

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`/api/survey/${id}/response`, { responses });
      alert('Survey submitted successfully');
      router.push('/survey');
    } catch (error) {
      console.error('Failed to submit survey:', error);
    }
  };

  if (!survey) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h6">Loading Survey...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4">{survey.title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {survey.description}
        </Typography>
      </Box>

      {survey.questions.map((question) => (
        <Box key={question.id} sx={{ mb: 4 }}>
          <Typography variant="h6">{question.text}</Typography>
          {question.type === 'text' && (
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e) => handleResponseChange(question.id, e.target.value)}
            />
          )}
          {question.type === 'single_select' && (
            <RadioGroup
              onChange={(e) => handleResponseChange(question.id, e.target.value)}
            >
              {question.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.text}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          )}
          {question.type === 'multi_select' && (
            <Box>
              {question.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleResponseChange(question.id, {
                          ...responses[question.id],
                          [option.text]: e.target.checked,
                        })
                      }
                    />
                  }
                  label={option.text}
                />
              ))}
            </Box>
          )}
        </Box>
      ))}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Survey
        </Button>
      </Box>
    </Container>
  );
};

export default SurveyPage;
