// src/components/Survey/CreateSurvey.tsx

import React from "react";
import { Button, Stack, Typography, Box } from "@mui/material";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "@/utils/axiosConfig";
import { useAppDispatch } from "@/store/store";
import { fetchSurveys } from "../../../../store/slices/surveySlice";
import SurveyDetails from "./SurveyDetails";
import QuestionsList from "./QuestionsList";
import { schema } from "@/utils/surveySchema";
import { SurveyInput } from "@/app/api/survey/schema";

interface CreateSurveyProps {
  onClose: () => void;
}

const CreateSurvey: React.FC<CreateSurveyProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const methods = useForm<SurveyInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      questions: [],
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit: SubmitHandler<SurveyInput> = async (data) => {
    try {
      await axiosInstance.post("/api/survey", data);
      dispatch(fetchSurveys());
      onClose();
    } catch (error: any) {
      console.error("Failed to create survey:", error);
      alert(error.response?.data?.error || "Failed to create survey");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <SurveyDetails />
          <Box>
            <Typography variant="h5" mb={2}>Questions</Typography>
            <QuestionsList />
            {errors.questions?.message && (
              <Typography color="error" variant="caption">
                {errors.questions.message}
              </Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose} variant="outlined">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Create Survey</Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default CreateSurvey;
