import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { deleteTeacher, updateTeacher } from "../../api";
import { TeacherCard } from "./TeacherCard";

export const TeacherCardContainer = ({
  id,
  firstName,
  secondName,
  surname,
  lessonsType,
  subject,
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteTeacher(id),
    onSuccess: () => queryClient.invalidateQueries(["teachers"]),
  });

  const updateMutation = useMutation({
    mutationFn: (teacher) => updateTeacher(id, teacher),
    onSuccess: () => queryClient.invalidateQueries(["teachers"]),
  });

  const [isDeleteTeacherDialogOpened, setIsDeleteTeacherDialogOpened] =
    useState(false);
  const [isUpdateTeacherDialogOpened, setIsUpdateTeacherDialogOpened] =
    useState(false);

  const handleDeleteTeacherDialogOpen = () =>
    setIsDeleteTeacherDialogOpened(true);
  const handleDeleteTeacherDialogClose = () =>
    setIsDeleteTeacherDialogOpened(false);

  const handleUpdateTeacherDialogOpen = () =>
    setIsUpdateTeacherDialogOpened(true);
  const handleUpdateTeacherDialogClose = () =>
    setIsUpdateTeacherDialogOpened(false);

  return (
    <>
      <TeacherCard
        firstName={firstName}
        secondName={secondName}
        surname={surname}
        subjectName={subject.name}
        lessonsType={lessonsType}
        onDeleteClick={handleDeleteTeacherDialogOpen}
      />
    </>
  );
};
