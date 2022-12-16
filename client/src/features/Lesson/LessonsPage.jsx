import {
  Box,
  Button,
  Stack,
  Grid,
  Alert,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SchoolIcon from "@mui/icons-material/School";
import Add from "@mui/icons-material/Add";
import {
  conductLesson,
  createLesson,
  deleteLesson,
  fetchLessons,
  fetchSubjects,
  fetchTeachers,
  updateLesson,
} from "../../api";
import { LessonDialogForm } from "./LessonDialogForm";
import { CardSkeleton } from "../../components/CardSkeleton";
import { LessonCard } from "./LessonCard";

const LessonsList = ({
  lessonsQuery,
  subjectsQuery,
  teachersQuery,
  lessonsDisplay,
}) => {
  const queryClient = useQueryClient();

  const updateLessonMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: () => queryClient.invalidateQueries("lessons"),
  });

  const conductLessonMutation = useMutation({
    mutationFn: conductLesson,
    onSuccess: () => queryClient.invalidateQueries("lessons"),
  });

  const deleteLessonMutation = useMutation({
    mutation: deleteLesson,
    onSuccess: () => queryClient.invalidateQueries("lessons"),
  });

  if (lessonsQuery.isLoading || subjectsQuery.isLoading)
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

  let lessons = lessonsQuery.data;
  let emptyMessage = "Уроків немає";

  const subjects = subjectsQuery.data;
  const teachers = teachersQuery.data;

  switch (lessonsDisplay) {
    case "conducted":
      lessons = lessons.filter(({ isConducted }) => isConducted);
      emptyMessage = "Проведених уроків немає";
      break;
    case "pending":
      emptyMessage = "Очікуваних уроків немає";
      lessons = lessons.filter(({ isConducted }) => !isConducted);
  }

  if (!lessons.length) {
    return <Alert severity="info">{emptyMessage}</Alert>;
  }

  return (
    <Grid container spacing={2}>
      {lessons.map((lesson) => {
        const { id, isConducted } = lesson;

        const handleDelete = () => deleteLessonMutation.mutate(id);
        const handleConduct = () =>
          conductLessonMutation.mutate({
            id,
            isConducted: !isConducted,
          });
        const handleUpdate = (lesson) =>
          updateLessonMutation.mutate({
            id,
            lesson,
          });

        return (
          <Grid item xs={12} lg={6} key={lesson.id}>
            <LessonCard
              subjectName={
                subjects.find(({ id }) => id === lesson.subjectId).name
              }
              onDelete={handleDelete}
              onConduct={handleConduct}
              onUpdate={handleUpdate}
              teachers={teachers}
              subjects={subjects}
              {...lesson}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export const LessonsPage = ({ lessonsDisplay = "all" }) => {
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

  const lessonsDisplayNav = [
    {
      path: "/lessons/all",
      text: "Усі уроки",
      isActive: lessonsDisplay === "all",
    },
    {
      path: "/lessons/conducted",
      text: "Проведені",
      isActive: lessonsDisplay === "conducted",
    },
    {
      path: "/lessons/pending",
      text: "В очікуванні",
      isActive: lessonsDisplay === "pending",
    },
  ];
  return (
    <>
      {teachersQuery.isFetched && subjectsQuery.isFetched && (
        <LessonDialogForm
          isOpen={isLessonCreateDialogOpened}
          onClose={handleLessonCreateDialogClose}
          onSubmit={createLessonMutation.mutate}
          teachers={teachersQuery.data}
          subjects={subjectsQuery.data}
        />
      )}
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems={"center"} gap={2}>
            <SchoolIcon
              fontSize="inherit"
              sx={{
                fontSize: 50,
              }}
              color="primary"
            />
            <Typography variant="h3"> Уроки</Typography>
          </Box>
          <Button
            onClick={handleLessonCreateDialogOpen}
            variant="contained"
            disabled={isLessonCreateDialogOpened}
            endIcon={<Add fontSize="large" />}
          >
            Створити урок
          </Button>
        </Box>
        <Box component="nav" display="flex" gap={2}>
          {lessonsDisplayNav.map(({ path, text, isActive }) => (
            <Link
              component={RouterLink}
              sx={{
                color: isActive ? "theme.primary" : "text.primary",
              }}
              to={path}
              key={path}
            >
              {text}
            </Link>
          ))}
        </Box>
        <LessonsList
          lessonsQuery={lessonsQuery}
          subjectsQuery={subjectsQuery}
          teachersQuery={teachersQuery}
          lessonsDisplay={lessonsDisplay}
        />
      </Stack>
    </>
  );
};
