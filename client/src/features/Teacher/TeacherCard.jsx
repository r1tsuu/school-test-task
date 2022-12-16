import { useState } from "react";
import {
  Card,
  CardActions,
  Button,
  CardContent,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  DialogActions,
  Typography,
  Box,
  Dialog,
  Stack,
} from "@mui/material";
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
import { resolveSalary } from "../../utils/resolveSalary";
import { LessonTimeSelect } from "../../components/LessonTimeSelect";

const CalculateGroupSalary = ({
  name,
  groupSalaryRateOne,
  groupSalaryRateTwo,
  groupSalaryRateThree,
  groupSalaryRateDifference,
}) => {
  const [studentsCount, setStudentsCount] = useState(1);
  const [time, setTime] = useState(60);

  const isValidStudentsCount = studentsCount > 0;

  const handleStudentsCountChange = (e) =>
    setStudentsCount(Number(e.target.value));

  const handleTimeChange = (e) => setTime(e.target.value);

  const teacherSalary = resolveSalary(
    "group",
    {
      groupSalaryRateOne,
      groupSalaryRateTwo,
      groupSalaryRateThree,
      groupSalaryRateDifference,
    },
    studentsCount,
    time
  );

  return (
    <>
      <DialogTitle>
        Розрахунок зарплати групового уроку викладача {name}
      </DialogTitle>
      <DialogContent
        sx={{
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          <TextField
            autoComplete="off"
            sx={{
              mt: 2,
            }}
            error={!isValidStudentsCount}
            fullWidth
            type="number"
            inputProps={{
              min: 1,
            }}
            value={studentsCount}
            onChange={handleStudentsCountChange}
            label="Кількість студентів"
          />
          <LessonTimeSelect value={time} onChange={handleTimeChange} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Typography
          sx={{
            width: "100%",
          }}
          textAlign="center"
          variant="h5"
        >
          {isValidStudentsCount ? (
            <span>
              Зарплата вчителя за урок{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontSize: 40 }}
              >
                {teacherSalary}
              </Box>{" "}
              грн
            </span>
          ) : (
            "Невірно набрана кількість студентів"
          )}
        </Typography>
      </DialogActions>
    </>
  );
};

export const TeacherCard = ({
  name,
  id,
  lessonsType,
  individualSalaryRate,
  groupSalaryRateOne,
  groupSalaryRateTwo,
  groupSalaryRateThree,
  groupSalaryRateDifference,
  subject,
  onDelete,
  onUpdate,
  subjects,
}) => {
  const [isDeleteTeacherDialogOpened, setIsDeleteTeacherDialogOpened] =
    useState(false);
  const [isUpdateTeacherDialogOpened, setIsUpdateTeacherDialogOpened] =
    useState(false);

  const [
    isCalculateGroupSalaryDialogOpened,
    setIsCalculateGroupSalaryDialogOpened,
  ] = useState(false);

  const handleDeleteTeacherDialogOpen = () =>
    setIsDeleteTeacherDialogOpened(true);
  const handleDeleteTeacherDialogClose = () =>
    setIsDeleteTeacherDialogOpened(false);

  const handleCalculateGroupSalaryDialogOpen = () =>
    setIsCalculateGroupSalaryDialogOpened(true);
  const handleCalculateGroupSalaryDialogClose = () =>
    setIsCalculateGroupSalaryDialogOpened(false);

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
      ? [
          {
            title: "1 учень",
            value: groupSalaryRateOne + " грн",
            icon: <MoneyIcon />,
          },
          {
            title: "2 учня",
            value: groupSalaryRateTwo + " грн",
            icon: <MoneyIcon />,
          },
          {
            title: "3 учня",
            value: groupSalaryRateThree + " грн",
            icon: <MoneyIcon />,
          },
          {
            title: "Різниця прогресії учнів",
            value: (
              <Box display="flex" gap={2}>
                <span> {groupSalaryRateDifference} грн</span>
                <Button onClick={handleCalculateGroupSalaryDialogOpen}>
                  Розрахувати
                </Button>
              </Box>
            ),
            icon: <MoneyIcon />,
          },
        ]
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
        defaultGroupSalaryRateOne={groupSalaryRateOne}
        defaultGroupSalaryRateTwo={groupSalaryRateTwo}
        defaultGroupSalaryRateThree={groupSalaryRateThree}
        defaultGroupSalaryRateDifference={groupSalaryRateDifference}
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
      <Dialog
        open={isCalculateGroupSalaryDialogOpened}
        onClose={handleCalculateGroupSalaryDialogClose}
      >
        <CalculateGroupSalary
          name={name}
          groupSalaryRateOne={groupSalaryRateOne}
          groupSalaryRateTwo={groupSalaryRateTwo}
          groupSalaryRateThree={groupSalaryRateThree}
          groupSalaryRateDifference={groupSalaryRateDifference}
        />
      </Dialog>
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
