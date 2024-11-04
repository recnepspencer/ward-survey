import React, { useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import OptionItem from "./OptionItem";
import { QuestionType } from "@prisma/client";

interface QuestionItemProps {
  nestIndex: number;
  removeQuestion: (index: number) => void;
}

const questionTypes: QuestionType[] = [
  "text",
  "single_select",
  "multi_select",
  "likert",
];

const QuestionItem: React.FC<QuestionItemProps> = ({ nestIndex, removeQuestion }) => {
  const { control, register, watch, formState: { errors } } = useFormContext();

  // Explicitly cast errors.questions as an array of errors for questions.
  const questionErrors = errors.questions as { [key: number]: any } | undefined;

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  const questionType = watch(`questions.${nestIndex}.type`);

  // Automatically add an empty option when a question is added and requires options
  useEffect(() => {
    if (
      (questionType === "single_select" ||
        questionType === "multi_select" ||
        questionType === "likert") &&
      optionFields.length === 0
    ) {
      appendOption({ text: "" });
    }
  }, [questionType, appendOption, optionFields.length]);

  const questionTextError = questionErrors?.[nestIndex]?.text?.message || undefined;
  const questionTypeError = questionErrors?.[nestIndex]?.type?.message || undefined;

  return (
    <Box mb={4} p={2} border="1px solid #ccc" borderRadius="8px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Question {nestIndex + 1}</Typography>
        <IconButton onClick={() => removeQuestion(nestIndex)} color="error">
          <Remove />
        </IconButton>
      </Box>

      <TextField
        label="Question Text"
        fullWidth
        {...register(`questions.${nestIndex}.text` as const)}
        error={!!questionTextError}
        helperText={questionTextError || ""}
      />

      {/* Wrapping FormControl in Box for margin */}
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel id={`question-type-label-${nestIndex}`}>Type</InputLabel>
          <Controller
            control={control}
            name={`questions.${nestIndex}.type` as const}
            render={({ field }) => (
              <Select
                labelId={`question-type-label-${nestIndex}`}
                label="Type"
                {...field}
              >
                {questionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.replace("_", " ").toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {questionTypeError && (
            <Typography color="error" variant="caption">
              {questionTypeError}
            </Typography>
          )}
        </FormControl>
      </Box>

      {(questionType === "single_select" ||
        questionType === "multi_select" ||
        questionType === "likert") && (
        <Box mt={2}>
          <Typography variant="subtitle1" mb={1}>
            Options
          </Typography>
          {optionFields.map((field, index) => (
            <OptionItem
              key={field.id}
              nestIndex={nestIndex}
              index={index}
              remove={removeOption}
            />
          ))}
          <Button
            variant="outlined"
            onClick={() => appendOption({ text: "" })}
            startIcon={<Add />}
          >
            Add Option
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionItem;
