import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { deleteTeacher, updateTeacher } from "../../api";
import { TeacherDeleteDialog } from "./TaecherDeleteDialog";
import { TeacherCard } from "./TeacherCard";
import { TeacherDialogForm } from "./TeacherDialogForm";

export const TeacherCardContainer = ({
  id,
  subjects,
  firstName,
  secondName,
  surname,
  lessonsType,
  groupSalaryRate,
  individualSalaryRate,
  subject,
}) => {
  const [isDeleteTeacherDialogOpened, setIsDeleteTeacherDialogOpened] =
    useState(false);
  const [isUpdateTeacherDialogOpened, setIsUpdateTeacherDialogOpened] =
    useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      deleteTeacher(id);
    },
    onSuccess: () => {
      setIsDeleteTeacherDialogOpened(false);
      queryClient.invalidateQueries(["teachers"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (teacher) => updateTeacher(id, teacher),
    onSuccess: () => {
      setIsUpdateTeacherDialogOpened(false);
      queryClient.invalidateQueries(["teachers"]);
    },
  });

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
      <TeacherDialogForm
        title="Редагувати викладача"
        isOpen={isUpdateTeacherDialogOpened}
        onClose={handleUpdateTeacherDialogClose}
        onSubmit={updateMutation.mutate}
        isLoading={deleteMutation.isLoading}
        subjects={subjects}
        defaultFirstName={firstName}
        defaultSecondName={secondName}
        defaultSurname={surname}
        defaultGroupSalaryRate={groupSalaryRate}
        defaultLessonsType={lessonsType}
        defaultSubjectId={subject.id}
        defaultIndividualSalaryRate={individualSalaryRate}
      />
      <TeacherDeleteDialog
        name={firstName}
        isOpen={isDeleteTeacherDialogOpened}
        onClose={handleDeleteTeacherDialogClose}
        onSubmit={deleteMutation.mutate}
        isLoading={deleteMutation.isLoading}
      />
      <TeacherCard
        firstName={firstName}
        secondName={secondName}
        surname={surname}
        subjectName={subject.name}
        lessonsType={lessonsType}
        individualSalaryRate={individualSalaryRate}
        groupSalaryRate={groupSalaryRate}
        onOpenDeleteDialog={handleDeleteTeacherDialogOpen}
        onOpenUpdateDialog={handleUpdateTeacherDialogOpen}
      />
    </>
  );
};
