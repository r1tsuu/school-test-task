import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchTeachers, createTeacher, fetchSubjects } from "../../api";
import { TeacherCardContainer } from "./TeacherCardContainer";
import { TeacherCardSkeleton } from "./TeacherCardSkeleton";
import { TeacherCreateDialog } from "./TeacherCreateDialog";

export const TeachersPage = () => {
  const queryClient = useQueryClient();
  const teachersQuery = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });
  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const createTeacherMutation = useMutation({
    mutationFn: (teacher) =>
      createTeacher(teacher).then(() => setIsCreateTeacherDialogOpened(false)),
    onSuccess: () => {
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
    <Box display="flex" flexDirection="column" gap={10}>
      {subjectsQuery.isFetched && isCreateTeacherDialogOpened && (
        <TeacherCreateDialog
          onSubmit={createTeacherMutation.mutate}
          subjects={subjectsQuery.data.data}
          onClose={handleCreateTeacherDialogClose}
          isOpen={isCreateTeacherDialogOpened}
          isLoading={createTeacherMutation.isLoading}
        />
      )}
      <Button
        onClick={handleCreateTeacherDialogOpen}
        variant="contained"
        disabled={isCreateTeacherDialogOpened || subjectsQuery.isLoading}
      >
        Створити викладача
      </Button>
      <Grid container spacing={2}>
        {teachersQuery.isLoading
          ? Array(6)
              .fill("_")
              .map((_, index) => (
                <Grid item xs={12} lg={4} key={index}>
                  <TeacherCardSkeleton />
                </Grid>
              ))
          : teachersQuery.data.data.map((teacher) => (
              <Grid item xs={12} lg={4} key={teacher.id}>
                <TeacherCardContainer {...teacher} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
