// src/services/survey/getSurveyService.ts

import { prisma } from '@/lib/prisma';

export const getSurveyById = async (id: string) => {
  const survey = await prisma.survey.findUnique({
    where: { id },
    include: {
      questions: true,
    },
  });

  if (!survey) {
    console.log(`Survey with ID ${id} not found`);
    return null;
  }

  console.log('Fetched Survey:', survey);
  return survey;
};

export const getAllSurveys = async () => {
  const surveys = await prisma.survey.findMany({
    include: {
      questions: true,
    },
  });

  console.log('Fetched All Surveys:', surveys);
  return surveys;
};
