import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Stack,
  Box,
  InputAdornment,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import { useState } from "react";
import { LessonTypeSelect } from "../../components/LessonTypeSelect";
import { SubjectSelect } from "../../components/SubjectSelect";

const TeacherForm = ({
  onClose,
  onSubmit,
  subjects,
  defaultName,
  defaultSubjectId,
  defaultIndividualSalaryRate,
  defaultGroupSalaryRateOne,
  defaultGroupSalaryRateTwo,
  defaultGroupSalaryRateThree,
  defaultGroupSalaryRateDifference,
  defaultLessonsType,
  title,
}) => {
  const [name, setName] = useState(defaultName);
  const [subjectId, setSubjectId] = useState(
    defaultSubjectId ?? subjects[0].id
  );
  const [individualSalaryRate, setIndividualSalaryRate] = useState(
    defaultIndividualSalaryRate
  );

  const [lessonsType, setLessonsType] = useState(defaultLessonsType);

  const [groupSalaryRateOne, setGroupSalaryRateOne] = useState(
    defaultGroupSalaryRateOne
  );
  const [groupSalaryRateTwo, setGroupSalaryRateTwo] = useState(
    defaultGroupSalaryRateTwo
  );
  const [groupSalaryRateThree, setGroupSalaryRateThree] = useState(
    defaultGroupSalaryRateThree
  );
  const [groupSalaryRateDifference, setGroupSalaryRateDifference] = useState(
    defaultGroupSalaryRateDifference
  );

  const handleNameChange = (e) => setName(e.target.value);

  const handleSubjectIdChange = (e) => setSubjectId(e.target.value);

  const handleLessonsTypeChange = (e) => setLessonsType(e.target.value);

  const handleIndividualSalaryRateChange = (e) =>
    setIndividualSalaryRate(e.target.value);

  const handleGroupSalaryRateOneChange = (e) =>
    setGroupSalaryRateOne(e.target.value);

  const handleGroupSalaryRateTwoChange = (e) =>
    setGroupSalaryRateTwo(e.target.value);

  const handleGroupSalaryRateThreeChange = (e) =>
    setGroupSalaryRateThree(e.target.value);

  const handleGroupSalaryRateDifferenceChange = (e) =>
    setGroupSalaryRateDifference(e.target.value);

  const handleSubmit = () => {
    onSubmit({
      name,
      subjectId,
      lessonsType,
      ...(lessonsType === "group"
        ? {
            groupSalaryRateOne,
            groupSalaryRateTwo,
            groupSalaryRateThree,
            groupSalaryRateDifference,
          }
        : { individualSalaryRate }),
    });
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          gap: 2,
        }}
      >
        <TextField
          value={name}
          onChange={handleNameChange}
          fullWidth
          variant="standard"
          label="Ім'я"
        />
        <SubjectSelect
          subjects={subjects}
          value={subjectId}
          onChange={handleSubjectIdChange}
        />
        <LessonTypeSelect
          value={lessonsType}
          onChange={handleLessonsTypeChange}
        />
        <FormControl fullWidth>
          <FormLabel>Зарплатна ставка</FormLabel>
          <Box mt={2}>
            {lessonsType === "group" ? (
              <Stack spacing={1}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  type="number"
                  value={groupSalaryRateOne}
                  onChange={handleGroupSalaryRateOneChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₴</InputAdornment>
                    ),
                  }}
                  label={`Кількість учнів: 1`}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  type="number"
                  value={groupSalaryRateTwo}
                  onChange={handleGroupSalaryRateTwoChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₴</InputAdornment>
                    ),
                  }}
                  label={`Кількість учнів: 2`}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  type="number"
                  value={groupSalaryRateThree}
                  onChange={handleGroupSalaryRateThreeChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₴</InputAdornment>
                    ),
                  }}
                  label={`Кількість учнів: 3`}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  type="number"
                  value={groupSalaryRateDifference}
                  onChange={handleGroupSalaryRateDifferenceChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₴</InputAdornment>
                    ),
                  }}
                  label={`Різниця прогресії учнів > 3`}
                />
              </Stack>
            ) : (
              <TextField
                fullWidth
                type="number"
                value={individualSalaryRate}
                onChange={handleIndividualSalaryRateChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₴</InputAdornment>
                  ),
                }}
              />
            )}
          </Box>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, py: 3 }}>
        <Button endIcon={<CancelIcon />} variant="outlined" onClick={onClose}>
          Відмінити
        </Button>
        <Button
          endIcon={<CheckIcon />}
          disabled={!Boolean(name)}
          variant="contained"
          onClick={handleSubmit}
        >
          Підтвердити
        </Button>
      </DialogActions>
    </>
  );
};

export const TeacherDialogForm = ({
  isOpen,
  onSubmit,
  onClose,
  subjects,
  title,
  defaultName = "",
  defaultSubjectId,
  defaultIndividualSalaryRate,
  defaultGroupSalaryRateOne,
  defaultGroupSalaryRateTwo,
  defaultGroupSalaryRateThree,
  defaultGroupSalaryRateDifference,
  defaultLessonsType = "individual",
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <TeacherForm
        defaultName={defaultName}
        defaultSubjectId={defaultSubjectId}
        defaultIndividualSalaryRate={defaultIndividualSalaryRate ?? 120}
        defaultGroupSalaryRateOne={defaultGroupSalaryRateOne ?? 120}
        defaultGroupSalaryRateTwo={defaultGroupSalaryRateTwo ?? 150}
        defaultGroupSalaryRateThree={defaultGroupSalaryRateThree ?? 200}
        defaultGroupSalaryRateDifference={
          defaultGroupSalaryRateDifference ?? 60
        }
        defaultLessonsType={defaultLessonsType}
        title={title}
        onSubmit={onSubmit}
        onClose={onClose}
        subjects={subjects}
      />
    </Dialog>
  );
};
