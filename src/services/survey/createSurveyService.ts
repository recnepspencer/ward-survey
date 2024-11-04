// src/services/surveyService.ts

import { prisma } from '@/lib/prisma';
import { CustomSurveyInput } from '@/types/survey';
import { Prisma } from '@prisma/client';

export const createSurveyService = async (data: CustomSurveyInput, userId: string) => {
  // Fetch the user's organization
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { organization: true },
  });

  if (!user || !user.organizationId) {
    throw { message: 'User is not part of any organization', status: 400 };
  }

  // Map questions with correct type
  const questionsData: Prisma.QuestionCreateWithoutSurveyInput[] = data.questions.map((q, index) => ({
    text: q.text,
    type: q.type,
    options: q.options ? q.options.map(opt => opt.text) : undefined,
    order: index + 1,
  }));

  // Create the survey
  const survey = await prisma.survey.create({
    data: {
      title: data.title,
      description: data.description,
      createdBy: userId,
      organizationId: user.organizationId,
      questions: {
        create: questionsData,
      },
    },
    include: {
      questions: true,
    },
  });

  return survey;
};
