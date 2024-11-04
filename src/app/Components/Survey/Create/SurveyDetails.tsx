// src/components/Survey/SurveyDetails.tsx

import React from "react";
import { TextField, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const SurveyDetails: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Extract error messages safely with optional chaining
  const titleErrorMessage = errors.title?.message as string | undefined;
  const descriptionErrorMessage = errors.description?.message as string | undefined;

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Survey Details</Typography>
      <TextField
        label="Survey Title"
        fullWidth
        {...register("title")}
        error={!!errors.title}
        helperText={titleErrorMessage || ""}
      />
      <TextField
        label="Survey Description"
        fullWidth
        multiline
        rows={3}
        {...register("description")}
        error={!!errors.description}
        helperText={descriptionErrorMessage || ""}
      />
    </Stack>
  );
};

export default SurveyDetails;
