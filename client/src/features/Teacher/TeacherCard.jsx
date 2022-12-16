import { useState } from "react";
import { Card, CardActions, Button, CardContent, Stack } from "@mui/material";
import { TeacherDialogForm } from "./TeacherDialogForm";
import { CardList } from "../../components/CardList";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import Person4Icon from "@mui/icons-material/Person4";
import GroupsIcon from "@mui/icons-material/Groups";
import MoneyIcon from "@mui/icons-material/Money";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";

export const TeacherCard = ({
  name,
  id,
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

  const handleConfirmDelete = async () => {
    await onDelete();
    handleDeleteTeacherDialogClose();
  };

  const handleUpdateTeacherDialogOpen = () =>
    setIsUpdateTeacherDialogOpened(true);
  const handleUpdateTeacherDialogClose = () =>
    setIsUpdateTeacherDialogOpened(false);

  const handleUpdate = async (data) => {
    await onUpdate(data);
    handleUpdateTeacherDialogClose();
  };

  const list = [
    {
      title: "Номер викладача",
      value: id,
      icon: <NumbersIcon />,
    },
    {
      title: "Ім'я",
      value: name,
      icon: <Person4Icon />,
    },
    {
      title: "Предмет",
      value: subject.name,
      icon: <SquareFootIcon />,
    },
    {
      title: "Тип уроків",
      value: lessonsType === "individual" ? "Індивідуальні" : "Групові",
      icon: lessonsType === "individual" ? <PersonIcon /> : <GroupsIcon />,
    },
    ...(lessonsType === "group"
      ? ["1 учень", "2 учня", "3 учня", "4 учня", "5 учнів", "6 учнів"].map(
          (countText, index) => ({
            title: `Зарплатна ставка ${countText}`,
            value: `${groupSalaryRate[index]} грн`,
            icon: <MoneyIcon />,
          })
        )
      : [
          {
            title: "Зарплатна ставка",
            value: `${individualSalaryRate} грн`,
            icon: <MoneyIcon />,
          },
        ]),
  ];

  return (
    <>
      <TeacherDialogForm
        title="Редагувати викладача"
        isOpen={isUpdateTeacherDialogOpened}
        onClose={handleUpdateTeacherDialogClose}
        onSubmit={handleUpdate}
        subjects={subjects}
        defaultName={name}
        defaultGroupSalaryRate={groupSalaryRate}
        defaultLessonsType={lessonsType}
        defaultSubjectId={subject.id}
        defaultIndividualSalaryRate={individualSalaryRate}
      />
      <ConfirmDialog
        title={`Ви дійсно хочете видалити викладача ${name}?`}
        isOpen={isDeleteTeacherDialogOpened}
        onClose={handleDeleteTeacherDialogClose}
        onConfirm={handleConfirmDelete}
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
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Button
            onClick={handleUpdateTeacherDialogOpen}
            endIcon={<EditIcon />}
            variant="contained"
          >
            Редагувати
          </Button>
          <Button
            onClick={handleDeleteTeacherDialogOpen}
            endIcon={<DeleteIcon />}
            variant="outlined"
          >
            Видалити
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
