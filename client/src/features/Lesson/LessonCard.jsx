import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Alert,
  Snackbar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import Person4Icon from "@mui/icons-material/Person4";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupsIcon from "@mui/icons-material/Groups";
import MoneyIcon from "@mui/icons-material/Money";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";
import UndoIcon from "@mui/icons-material/Undo";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardList } from "../../components/CardList";
import { useState } from "react";
import { LessonDialogForm } from "./LessonDialogForm";
import { timeSelectOptions } from "../../utils/constants";

export const LessonCard = ({
  type,
  id,
  teacherSalary,
  teacher,
  subjectName,
  studentsCount,
  subjectId,
  isConducted,
  time,
  startDate,
  onConduct,
  onUpdate,
  onDelete,
  teachers,
  subjects,
}) => {
  const date = new Date(startDate);

  const [isSuccessedConductAlertOpened, setIsSuccessedConductAlertOpened] =
    useState(false);
  const [isUpdateDialogOpened, setIsUpdateDialogOpened] = useState(false);

  const handleConduct = async () => {
    await onConduct();
    setIsSuccessedConductAlertOpened(true);
  };

  const handleUpdateDialogOpen = () => setIsUpdateDialogOpened(true);
  const handleUpdateDialogClose = () => setIsUpdateDialogOpened(false);

  const handleSuccessedConductAlertClose = () =>
    setIsSuccessedConductAlertOpened(false);

  const list = [
    {
      title: "Номер уроку",
      value: id,
      icon: <NumbersIcon />,
    },
    {
      title: "Статус уроку",
      value: isConducted ? "Проведений" : "В очікуванні",
      icon: <InfoIcon color={isConducted ? "success" : "action"} />,
    },
    {
      title: "Предмет",
      value: subjectName,
      icon: <SquareFootIcon />,
    },
    {
      title: "Викладач",
      value: `${teacher.name}`,
      icon: <Person4Icon />,
    },
    {
      title: "Дата початку уроку",
      value: date.toLocaleDateString("ru-RU"),
      icon: <EventNoteIcon />,
    },
    {
      title: "Час початку уроку",
      value: date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: <EventNoteIcon />,
    },
    {
      title: "Час проведення уроку",
      value: timeSelectOptions.find(({ value }) => value === time)?.label,
      icon: <ScheduleIcon />,
    },
    {
      title: "Тип уроку",
      value:
        type === "individual"
          ? "Індивідуальний"
          : `Груповий, кількість студентів: ${studentsCount}`,
      icon: type === "individual" ? <PersonIcon /> : <GroupsIcon />,
    },
    {
      title: "Зарплата викладача за урок",
      value: `${teacherSalary} грн`,
      icon: <MoneyIcon />,
    },
  ];

  return (
    <Card>
      <LessonDialogForm
        isOpen={isUpdateDialogOpened}
        onClose={handleUpdateDialogClose}
        onSubmit={onUpdate}
        teachers={teachers}
        subjects={subjects}
        defaultStartDate={startDate}
        defaultSubjectId={subjectId}
        defaultType={type}
        defaultTime={time}
        defaultStudentsCount={studentsCount}
        defaultTeacherId={teacher.id}
      />
      <CardContent>
        <CardList list={list} />
      </CardContent>

      <CardActions
        sx={{
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Button
          onClick={handleConduct}
          endIcon={isConducted ? <UndoIcon /> : <DoneIcon />}
        >
          {isConducted ? "Відмінити проведення" : "Провести урок"}
        </Button>
        <Box display="flex" gap={3}>
          <Button
            onClick={handleUpdateDialogOpen}
            endIcon={<EditIcon />}
            variant="contained"
          >
            Редагувати
          </Button>
          <Button
            onClick={onDelete}
            endIcon={<DeleteIcon />}
            variant="outlined"
          >
            Видалити
          </Button>
        </Box>
      </CardActions>
      <Snackbar
        open={isSuccessedConductAlertOpened}
        onClose={handleSuccessedConductAlertClose}
        autoHideDuration={1200}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleSuccessedConductAlertClose} severity="success">
          {isConducted
            ? "Урок успішно був проведений"
            : "Проведення успішно відмінено"}
        </Alert>
      </Snackbar>
    </Card>
  );
};
