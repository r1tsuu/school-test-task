import { Box, Button, Grid, Stack, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchTeachers, createTeacher, fetchSubjects } from "../../api";
import { TeacherCardContainer } from "./TeacherCardContainer";
import { TeacherCardSkeleton } from "./TeacherCardSkeleton";
import { TeacherDialogForm } from "./TeacherDialogForm";

const TeachersList = ({ subjectsQuery, teachersQuery }) => {
  if (teachersQuery.isLoading || subjectsQuery.isLoading)
    return (
      <Grid container spacing={2}>
        {Array(6)
          .fill("_")
          .map((_, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <TeacherCardSkeleton />
            </Grid>
          ))}
      </Grid>
    );

  const { data: teachers } = teachersQuery.data;
  const { data: subjects } = subjectsQuery.data;

  if (!teachers.length) {
    return <Alert severity="info">Викладачів немає</Alert>;
  }

  return (
    <Grid container spacing={2}>
      {teachers.map((teacher) => (
        <Grid item xs={12} lg={4} key={teacher.id}>
          <TeacherCardContainer subjects={subjects} {...teacher} />
        </Grid>
      ))}
    </Grid>
  );
};

export const TeachersPage = () => {
  const queryClient = useQueryClient();
  const teachersQuery = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
    enabled: true,
  });
  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const createTeacherMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      setIsCreateTeacherDialogOpened(false);
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
  });

  const [isCreateTeacherDialogOpened, setIsCreateTeacherDialogOpened] =
    useState(false);

  const handleCreateTeacherDialogOpen = () =>
    setIsCreateTeacherDialogOpened(true);
  const handleCreateTeacherDialogClose = () =>
    setIsCreateTeacherDialogOpened(false);

  return (
    <>
      {subjectsQuery.isFetched && (
        <TeacherDialogForm
          title="Створити викладача"
          onSubmit={createTeacherMutation.mutate}
          subjects={subjectsQuery.data.data}
          onClose={handleCreateTeacherDialogClose}
          isOpen={isCreateTeacherDialogOpened}
          isLoading={createTeacherMutation.isLoading}
        />
      )}
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Викладачі</Typography>
          <Button
            onClick={handleCreateTeacherDialogOpen}
            variant="contained"
            disabled={isCreateTeacherDialogOpened || subjectsQuery.isLoading}
          >
            Створити викладача
          </Button>
        </Box>
        <TeachersList
          subjectsQuery={subjectsQuery}
          teachersQuery={teachersQuery}
        />
      </Stack>
    </>
  );
};
