// src/app/api/survey/route.ts

import { z } from 'zod';

export const questionOptionSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
});

export const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['text', 'single_select', 'multi_select', 'likert']),
  options: z.array(questionOptionSchema).min(2, 'At least two options are required').optional(),
});

export const surveySchema = z.object({
  title: z.string().min(1, 'Survey title is required'),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type SurveyInput = z.infer<typeof surveySchema>;
