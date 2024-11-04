import React from "react";
import { TextField, IconButton, Box } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { UseFieldArrayRemove, useFormContext, FieldErrors } from "react-hook-form";

interface OptionItemProps {
  nestIndex: number;
  index: number;
  remove: UseFieldArrayRemove;
}

// Define the error interface for type safety
interface OptionError {
  text?: { message: string };
}

interface QuestionError {
  options?: OptionError[];
}

interface FormErrors {
  questions?: QuestionError[];
}

const OptionItem: React.FC<OptionItemProps> = ({ nestIndex, index, remove }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ questions: { options: { text: string }[] }[] }>();

  const typedErrors = errors as FieldErrors<FormErrors>;

  // Retrieve the message safely, ensuring it's either a string or undefined
  const helperText =
    typedErrors.questions?.[nestIndex]?.options?.[index]?.text?.message ?? undefined;

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <TextField
        label={`Option ${index + 1}`}
        fullWidth
        {...register(`questions.${nestIndex}.options.${index}.text` as const)}
        error={!!helperText}
        helperText={typeof helperText === "string" ? helperText : undefined} // Ensure helperText is a string or undefined
      />
      <IconButton onClick={() => remove(index)} color="error">
        <Remove />
      </IconButton>
    </Box>
  );
};

export default OptionItem;
