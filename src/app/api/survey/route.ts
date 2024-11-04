// src/app/api/survey/route.ts

import { NextResponse } from 'next/server';
import { createControllers } from '@/utils/createController';
import { errorHandler } from '@/utils/errorHandler';
import { useAuth } from '@/utils/useAuth';
import { createSurveyService } from '@/services/survey/createSurveyService';
import { getSurveyById, getAllSurveys } from '@/services/survey/getSurveyService';
import { surveySchema, SurveyInput } from './schema';

// Custom create function with user ID
const customCreateSurvey = async (data: SurveyInput, req?: Request) => {
  if (!req) throw { message: 'Unauthorized', status: 401 };

  const user = await useAuth(req);
  if (!user) throw { message: 'Unauthorized', status: 401 };

  return await createSurveyService(data, user.id);
};

// Custom get function to fetch a survey by ID or get all surveys
const customGetSurvey = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    const survey = await getSurveyById(id);
    if (!survey) {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }
    return NextResponse.json(survey);
  } else {
    const surveys = await getAllSurveys();
    return NextResponse.json(surveys);
  }
};

// Define controllers with custom functions
const { postHandler } = createControllers({
  model: 'survey',
  createFunction: customCreateSurvey,
});

export async function POST(req: Request) {
  try {
    return await postHandler(req);
  } catch (error) {
    console.error('Error in POST /api/survey:', error);
    return errorHandler(error);
  }
}

export async function GET(req: Request) {
  try {
    return await customGetSurvey(req);
  } catch (error) {
    console.error('Error in GET /api/survey:', error);
    return errorHandler(error);
  }
}
