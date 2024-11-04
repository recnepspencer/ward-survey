// src/components/Survey/QuestionsList.tsx

import React from "react";
import { Button, Stack } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Add } from "@mui/icons-material";
import QuestionItem from "./QuestionItem";

const QuestionsList: React.FC = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    append({
      text: "",
      type: "text",
      options: [],
    });
  };

  return (
    <Stack spacing={2}>
      {fields.map((field, index) => (
        <QuestionItem
          key={field.id}
          nestIndex={index}
          removeQuestion={remove}
        />
      ))}
      <Button
        variant="contained"
        onClick={addQuestion}
        startIcon={<Add />}
      >
        Add Question
      </Button>
    </Stack>
  );
};

export default QuestionsList;
