import { Box, Button, Grid, Stack, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchTeachers,
  createTeacher,
  fetchSubjects,
  updateTeacher,
  deleteTeacher,
} from "../../api";
import { CardSkeleton } from "../../components/CardSkeleton";
import { TeacherCard } from "./TeacherCard";
import { TeacherDialogForm } from "./TeacherDialogForm";

const TeachersList = ({ subjectsQuery, teachersQuery }) => {
  const queryClient = useQueryClient();
  const updateTeacherMutation = useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => queryClient.invalidateQueries("teachers"),
  });

  const deleteTeacherMutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => queryClient.invalidateQueries("teachers"),
  });

  if (teachersQuery.isLoading || subjectsQuery.isLoading)
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

  const { data: teachers } = teachersQuery;
  const { data: subjects } = subjectsQuery;

  if (!teachers.length) {
    return <Alert severity="info">Викладачів немає</Alert>;
  }

  return (
    <Grid container spacing={2}>
      {teachers.map((teacher) => {
        const { id } = teacher;

        const handleDelete = () => deleteTeacherMutation.mutate(id);
        const handleUpdate = (teacher) =>
          updateTeacherMutation.mutate({ id, teacher });

        return (
          <Grid item xs={12} lg={6} key={id}>
            <TeacherCard
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              subjects={subjects}
              {...teacher}
            />
          </Grid>
        );
      })}
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
    onSuccess: () => queryClient.invalidateQueries("teachers"),
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
          subjects={subjectsQuery.data}
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
