import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
} from "@mui/material";
import { useState } from "react";

import { LessonTypeSelect } from "../../components/LessonTypeSelect";
import { SubjectSelect } from "../../components/SubjectSelect";
import { useEffect, useRef, useMemo } from "react";

const LessonCreateContentForm = ({ onClose, onSubmit, teachers, subjects }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const [type, setType] = useState("individual");
  const [studentsCount, setStudentsCount] = useState(null);

  const filteredTeachers = useMemo(
    () =>
      teachers.filter(
        (teacher) =>
          teacher.subjectId === subjectId && teacher.lessonsType === type
      ),
    [subjectId, type]
  );

  const [teacherId, setTeacherId] = useState(
    filteredTeachers.length ? filteredTeachers[0].id : null
  );

  const currentTeacher = useMemo(() => {
    if (!teacherId) return null;
    return teachers.find(({ id }) => id === teacherId);
  }, [teacherId]);

  const mounted = useRef(false);

  const teacherSalary = useMemo(() => {
    if (!currentTeacher) return null;
    if (type === "individual") return currentTeacher.individualSalaryRate;
    return currentTeacher.groupSalaryRate?.[studentsCount - 1];
  }, [studentsCount, currentTeacher]);

  const handleSubjectIdChange = (e) => setSubjectId(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleTeacherIdChange = (e) => setTeacherId(e.target.value);
  const handleStudentsCountChange = (e) => setStudentsCount(e.target.value);

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
      teacherSalary,
      type,
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack mt={2} spacing={3}>
            <DesktopDatePicker
              label="Дата початку"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Час початку"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <LessonTypeSelect value={type} onChange={handleTypeChange} />
            <SubjectSelect
              subjects={subjects}
              value={subjectId}
              onChange={handleSubjectIdChange}
            />
            <FormControl fullWidth>
              <FormLabel>Викладач</FormLabel>
              {filteredTeachers.length ? (
                <Select onChange={handleTeacherIdChange} value={teacherId}>
                  {filteredTeachers.map(
                    ({ id, firstName, secondName, surname }) => (
                      <MenuItem key={id} value={id}>
                        {firstName} {secondName} {surname}
                      </MenuItem>
                    )
                  )}
                </Select>
              ) : (
                <Alert severity="error">Викладачів не знайдено</Alert>
              )}
            </FormControl>
            {type === "group" && (
              <FormControl fullWidth>
                <FormLabel>Кількість Студентів</FormLabel>
                <Select
                  disabled={!currentTeacher}
                  onChange={handleStudentsCountChange}
                  value={studentsCount}
                >
                  {Array(6)
                    .fill("_")
                    .map((_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} spacing={1.5}>
          {currentTeacher && (
            <Typography textAlign="center" variant="subtitle1">
              Зарплата вчителя за урок: {teacherSalary}
              грн
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button variant="outlined" onClick={onClose}>
              Відмінити
            </Button>
            <Button
              disabled={!currentTeacher}
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

export const LessonCreateDialogForm = ({
  isOpen,
  onClose,
  onSubmit,
  teachers,
  subjects,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <LessonCreateContentForm
        onClose={onClose}
        onSubmit={onSubmit}
        teachers={teachers}
        subjects={subjects}
      />
    </Dialog>
  );
};
