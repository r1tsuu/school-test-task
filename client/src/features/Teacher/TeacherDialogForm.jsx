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

const GroupSalaryForm = ({ value, onChange }) => {
  const handleChange = (index) => {
    return (e) => {
      onChange(index, e);
    };
  };
  return (
    <Stack spacing={1}>
      {[1, 2, 3, 4, 5, 6].map((count, index) => (
        <TextField
          key={count}
          fullWidth
          type="number"
          value={value[index]}
          onChange={handleChange(index)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₴</InputAdornment>,
          }}
          label={`Кількість учнів: ${count}`}
        />
      ))}
    </Stack>
  );
};

const TeacherForm = ({
  onClose,
  onSubmit,
  subjects,
  defaultName,
  defaultSubjectId,
  defaultIndividualSalaryRate,
  defaultGroupSalaryRate,
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
  const [groupSalaryRate, setGroupSalaryRate] = useState(
    defaultGroupSalaryRate
  );
  const [lessonsType, setLessonsType] = useState(defaultLessonsType);

  const handleNameChange = (e) => setName(e.target.value);

  const handleSubjectIdChange = (e) => setSubjectId(e.target.value);

  const handleLessonsTypeChange = (e) => setLessonsType(e.target.value);

  const handleIndividualSalaryRateChange = (e) =>
    setIndividualSalaryRate(e.target.value);

  const handleGroupSalaryRateChange = (index, e) => {
    const copy = [...groupSalaryRate];
    copy[index] = Number(e.target.value);
    setGroupSalaryRate(copy);
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      subjectId,
      lessonsType,
      ...(lessonsType === "group"
        ? { groupSalaryRate }
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
              <GroupSalaryForm
                value={groupSalaryRate}
                onChange={handleGroupSalaryRateChange}
              />
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
  defaultGroupSalaryRate,
  defaultLessonsType = "individual",
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <TeacherForm
        defaultName={defaultName}
        defaultSubjectId={defaultSubjectId}
        defaultIndividualSalaryRate={defaultIndividualSalaryRate ?? 120}
        defaultGroupSalaryRate={
          defaultGroupSalaryRate ?? [140, 160, 180, 200, 220, 250]
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
