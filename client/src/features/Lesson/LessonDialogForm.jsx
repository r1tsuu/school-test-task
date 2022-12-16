import dayjs from "dayjs";
import { useEffect, useRef, useMemo, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Stack,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Alert,
  Typography,
  InputAdornment,
} from "@mui/material";

import "dayjs/locale/ru";

import { LessonTypeSelect } from "../../components/LessonTypeSelect";
import { SubjectSelect } from "../../components/SubjectSelect";

import { resolveSalary } from "../../utils/resolveSalary";
import { LessonTimeSelect } from "../../components/LessonTimeSelect";

const LessonContentForm = ({
  onClose,
  onSubmit,
  teachers,
  subjects,
  defaultStartDate,
  defaultSubjectId,
  defaultType,
  defaultTime,
  defaultStudentsCount,
  defaultTeacherId,
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [subjectId, setSubjectId] = useState(defaultSubjectId);
  const [type, setType] = useState(defaultType);
  const [time, setTime] = useState(defaultTime);
  const [studentsCount, setStudentsCount] = useState(defaultStudentsCount);

  const filteredTeachers = useMemo(
    () =>
      teachers.filter(
        (teacher) =>
          teacher.subjectId === subjectId && teacher.lessonsType === type
      ),
    [subjectId, type]
  );

  const [teacherId, setTeacherId] = useState(
    defaultTeacherId ?? filteredTeachers.length ? filteredTeachers[0].id : null
  );

  const currentTeacher = useMemo(() => {
    if (!teacherId) return null;
    return teachers.find(({ id }) => id === teacherId);
  }, [teacherId]);

  const mounted = useRef(false);

  const isValidStudentsCount = type === "individual" || studentsCount > 0;

  const teacherSalary = useMemo(
    () => resolveSalary(type, currentTeacher, studentsCount, time),
    [currentTeacher, studentsCount, time]
  );

  const handleSubjectIdChange = (e) => setSubjectId(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleTeacherIdChange = (e) => setTeacherId(e.target.value);
  const handleStudentsCountChange = (e) =>
    setStudentsCount(Number(e.target.value));

  useEffect(() => {
    if (type === "group" && studentsCount === null) setStudentsCount(1);
  }, [type]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (!filteredTeachers.length) setTeacherId(null);
      else {
        const filteredTeacherIds = filteredTeachers.map(({ id }) => id);

        if (!filteredTeacherIds.includes(teacherId)) {
          setTeacherId(filteredTeacherIds[0]);
        }
      }
    }
  }, [subjectId, type]);

  const handleSubmit = () => {
    onSubmit({
      startDate,
      subjectId,
      teacherId,
      type,
      time,
      ...(type === "group" && {
        studentsCount,
      }),
    });
    onClose();
  };

  return (
    <>
      <DialogTitle>Створити урок</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          gap: 2,
        }}
      >
        <LocalizationProvider adapterLocale={"ru"} dateAdapter={AdapterDayjs}>
          <Stack mt={2} spacing={3}>
            <DesktopDatePicker
              label="Дата початку"
              inputFormat="MM.DD.YYYY"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              ampm={false}
              label="Час початку"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <LessonTimeSelect onChange={handleTimeChange} value={time} />
            <LessonTypeSelect value={type} onChange={handleTypeChange} />
            <SubjectSelect
              subjects={subjects}
              value={subjectId}
              onChange={handleSubjectIdChange}
            />
            <FormControl
              sx={{
                gap: 0.5,
              }}
              fullWidth
            >
              <FormLabel>Викладач</FormLabel>
              {filteredTeachers.length ? (
                <Select onChange={handleTeacherIdChange} value={teacherId}>
                  {filteredTeachers.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Alert severity="error">Викладачів не знайдено</Alert>
              )}
            </FormControl>
            {type === "group" && (
              <TextField
                autoComplete="off"
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
            )}
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} spacing={1.5}>
          {currentTeacher && (
            <Typography textAlign="center" variant="subtitle1">
              {isValidStudentsCount
                ? `Зарплата вчителя за урок: ${teacherSalary} грн`
                : "Невірно набрана кількість студентів"}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button
              endIcon={<CancelIcon />}
              variant="outlined"
              onClick={onClose}
            >
              Відмінити
            </Button>
            <Button
              endIcon={<CheckIcon />}
              disabled={!currentTeacher || !isValidStudentsCount}
              variant="contained"
              onClick={handleSubmit}
            >
              Підтвердити
            </Button>
          </Box>
        </Stack>
      </DialogActions>
    </>
  );
};

export const LessonDialogForm = ({
  isOpen,
  onClose,
  onSubmit,
  teachers,
  subjects,
  defaultStartDate = dayjs(),
  defaultSubjectId,
  defaultType = "individual",
  defaultTime = 60,
  defaultStudentsCount = 1,
  defaultTeacherId,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <LessonContentForm
        onClose={onClose}
        onSubmit={onSubmit}
        teachers={teachers}
        subjects={subjects}
        defaultStartDate={defaultStartDate}
        defaultSubjectId={defaultSubjectId ?? subjects[0].id}
        defaultType={defaultType}
        defaultTime={defaultTime}
        defaultStudentsCount={defaultStudentsCount}
        defaultTeacherId={defaultTeacherId}
      />
    </Dialog>
  );
};
