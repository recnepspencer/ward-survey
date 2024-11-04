// src/types/surveyTypes.ts

export type QuestionType = "text" | "single_select" | "multi_select" | "likert";

export interface QuestionOption {
  text: string;
}

export interface QuestionInput {
  text: string;
  type: QuestionType;
  options?: QuestionOption[];  // Keep as optional
}

export interface SurveyInput {
  title: string;
  description?: string;
  questions: QuestionInput[];
}
