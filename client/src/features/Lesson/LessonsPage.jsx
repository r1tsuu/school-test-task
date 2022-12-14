import { Box, Button, Stack, Grid, Alert, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createLesson,
  fetchLessons,
  fetchSubjects,
  fetchTeachers,
} from "../../api";
import { LessonCreateDialogForm } from "./LessonCreateDialogForm";
import { CardSkeleton } from "../../components/CardSkeleton";
import { LessonCard } from "./LessonCard";

const LessonsList = ({ lessonsQuery }) => {
  if (lessonsQuery.isLoading)
    return (
      <Grid container spacing={2}>
        {Array(6)
          .fill("_")
          .map((_, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <CardSkeleton />
            </Grid>
          ))}
      </Grid>
    );

  const lessons = lessonsQuery.data;

  if (!lessons.lessons) {
    <Alert severity="info">Уроків немає</Alert>;
  }

  return (
    <Grid container spacing={2}>
      {lessons.map((lesson) => (
        <Grid item xs={12} lg={6} key={lesson.id}>
          <LessonCard {...lesson} />
        </Grid>
      ))}
    </Grid>
  );
};

export const LessonsPage = () => {
  const queryClient = useQueryClient();

  const lessonsQuery = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  const teachersQuery = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => queryClient.invalidateQueries("lessons"),
  });

  const [isLessonCreateDialogOpened, setIsLessonCreateDialogOpened] =
    useState(false);

  const handleLessonCreateDialogOpen = () =>
    setIsLessonCreateDialogOpened(true);
  const handleLessonCreateDialogClose = () =>
    setIsLessonCreateDialogOpened(false);

  return (
    <>
      {teachersQuery.isFetched && subjectsQuery.isFetched && (
        <LessonCreateDialogForm
          isOpen={isLessonCreateDialogOpened}
          onClose={handleLessonCreateDialogClose}
          onSubmit={createLessonMutation.mutate}
          teachers={teachersQuery.data}
          subjects={subjectsQuery.data}
        />
      )}
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3"> Уроки</Typography>
          <Button
            onClick={handleLessonCreateDialogOpen}
            variant="contained"
            disabled={isLessonCreateDialogOpened}
          >
            Створити урок
          </Button>
        </Box>
        <LessonsList lessonsQuery={lessonsQuery} />
      </Stack>
    </>
  );
};
