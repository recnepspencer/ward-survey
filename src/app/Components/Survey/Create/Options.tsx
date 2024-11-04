// src/components/Options.tsx

import React from 'react';
import {
  TextField,
  IconButton,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useFieldArray, Controller } from 'react-hook-form';
import { Add, Remove } from '@mui/icons-material';

interface OptionsProps {
  nestIndex: number;
  control: any;
  register: any;
  errors: any;
}

const Options: React.FC<OptionsProps> = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  const addOption = () => {
    append({ text: '' });
  };

  return (
    <Box>
      {fields.map((field, k) => (
        <Grid container spacing={2} alignItems="center" key={field.id}>
          <Grid item xs={11}>
            <Controller
              control={control}
              name={`questions.${nestIndex}.options.${k}.text` as const}
              render={({ field }) => (
                <TextField
                  label={`Option ${k + 1}`}
                  fullWidth
                  {...field}
                  error={
                    !!errors.questions?.[nestIndex]?.options?.[k]?.text
                  }
                  helperText={
                    errors.questions?.[nestIndex]?.options?.[k]?.text?.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => remove(k)} color="error">
              <Remove />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Box mt={2} display="flex" alignItems="center">
        <IconButton onClick={addOption} color="primary">
          <Add />
        </IconButton>
        <Typography variant="button">Add Option</Typography>
      </Box>
      {errors.questions?.[nestIndex]?.options?.message && (
        <Typography color="error" variant="body2">
          {errors.questions[nestIndex].options.message}
        </Typography>
      )}
    </Box>
  );
};

export default Options;
