// src/utils/surveySchema.ts

import * as yup from "yup";
import { QuestionType, SurveyInput } from "../types/surveyTypes";

const questionTypes: QuestionType[] = ["text", "single_select", "multi_select", "likert"];

export const schema: yup.ObjectSchema<SurveyInput> = yup.object().shape({  // Explicitly type the schema
    title: yup.string().required("Survey title is required"),
    description: yup.string().optional().default(undefined),  // Make it optional with undefined default
    questions: yup
      .array()
      .of(
        yup.object({
          text: yup.string().required("Question text is required"),
          type: yup
            .mixed<QuestionType>()
            .oneOf(questionTypes, "Invalid question type")
            .required("Question type is required"),
          options: yup
            .array()
            .of(
              yup.object({
                text: yup.string().required("Option text is required")
              })
            )
            .optional()  // Keep as optional
            .when('type', {
              is: (type: QuestionType) => 
                type === 'single_select' || type === 'multi_select' || type === 'likert',
              then: (schema) => schema.min(1, "At least one option is required"),
              otherwise: (schema) => schema
            })
        })
      )
      .min(1, "At least one question is required")
      .required(),
  });