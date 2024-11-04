
export interface CustomQuestionInput {
  text: string;
  type: 'text' | 'single_select' | 'multi_select' | 'likert';
  options?: { text: string }[];
}

export interface CustomSurveyInput {
  title: string;
  description?: string;
  questions: CustomQuestionInput[];
}
