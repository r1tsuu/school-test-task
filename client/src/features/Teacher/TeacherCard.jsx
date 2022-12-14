import { useState } from "react";
import {
  IconButton,
  Card,
  CardActions,
  Button,
  CardContent,
  Dialog,
  DialogTitle,
  DialogActions,
  Stack,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { TeacherDialogForm } from "./TeacherDialogForm";
import { CardList } from "../../components/CardList";

const TeacherDeleteDialog = ({ name, isOpen, onClose, onSubmit }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Ви дійсно хочете видалити викладача {name}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Ні</Button>
        <Button onClick={onSubmit}>Так</Button>
      </DialogActions>
    </Dialog>
  );
};

export const TeacherCard = ({
  name,
  lessonsType,
  individualSalaryRate,
  groupSalaryRate,
  subject,
  onDelete,
  onUpdate,
  subjects,
}) => {
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

  const list = [
    {
      title: "Ім'я",
      value: name,
    },
    {
      title: "Предмет",
      value: subject.name,
    },
    {
      title: "Тип уроків",
      value: lessonsType === "individual" ? "Індивідуальні" : "Групові",
    },
    {
      title: "Зарплатна ставка",
      value:
        lessonsType === "individual" ? (
          `${individualSalaryRate} грн`
        ) : (
          <Stack spacing={1} overflow="auto">
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <div key={count}>
                {count}: {groupSalaryRate[count - 1]} грн
              </div>
            ))}
          </Stack>
        ),
    },
  ];

  return (
    <>
      <TeacherDialogForm
        title="Редагувати викладача"
        isOpen={isUpdateTeacherDialogOpened}
        onClose={handleUpdateTeacherDialogClose}
        onSubmit={onUpdate}
        subjects={subjects}
        defaultName={name}
        defaultGroupSalaryRate={groupSalaryRate}
        defaultLessonsType={lessonsType}
        defaultSubjectId={subject.id}
        defaultIndividualSalaryRate={individualSalaryRate}
      />
      <TeacherDeleteDialog
        name={name}
        isOpen={isDeleteTeacherDialogOpened}
        onClose={handleDeleteTeacherDialogClose}
        onSubmit={onDelete}
      />
      <Card
        sx={{
          overflow: "auto",
        }}
      >
        <CardContent>
          <CardList list={list} />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleUpdateTeacherDialogOpen}>Редагувати</Button>
          <IconButton onClick={handleDeleteTeacherDialogOpen}>
            <PersonRemoveIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
