import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  Box,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

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

export const TeacherCreateDialog = ({
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  subjects,
}) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [surname, setSurname] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id);
  const [individualSalaryRate, setIndividualSalaryRate] = useState(120);
  const [groupSalaryRate, setGroupSalaryRate] = useState([
    140, 160, 180, 200, 220, 250,
  ]);
  const [lessonsType, setLessonsType] = useState("individual");

  const [isValidationError, setIsValidationError] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleSecondNameChange = (e) => setSecondName(e.target.value);

  const handleSurnameChange = (e) => setSurname(e.target.value);

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
    if (firstName && secondName && surname) {
      if (isValidationError) setIsValidationError(false);
      onSubmit({
        firstName,
        secondName,
        surname,
        subjectId,
        lessonsType,
        ...(lessonsType === "group"
          ? { groupSalaryRate }
          : { individualSalaryRate }),
      });
    } else setIsValidationError(true);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Створити викладача</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          gap: 1.5,
        }}
      >
        <TextField
          error={isValidationError}
          value={firstName}
          onChange={handleFirstNameChange}
          fullWidth
          variant="standard"
          label="Ім'я"
        />
        <TextField
          error={isValidationError}
          value={secondName}
          onChange={handleSecondNameChange}
          fullWidth
          variant="standard"
          label="Прізвище"
        />
        <TextField
          error={isValidationError}
          value={surname}
          onChange={handleSurnameChange}
          fullWidth
          variant="standard"
          label="По батькові"
        />
        <FormControl fullWidth>
          <FormLabel>Предмет</FormLabel>
          <Select onChange={handleSubjectIdChange} value={subjectId}>
            {subjects.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Тип уроків</FormLabel>
          <RadioGroup value={lessonsType} onChange={handleLessonsTypeChange}>
            <FormControlLabel
              value="individual"
              control={<Radio />}
              label="Індивідуальні"
            />
            <FormControlLabel
              value="group"
              control={<Radio />}
              label="Групові"
            />
          </RadioGroup>
        </FormControl>
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
      <DialogActions>
        <Button onClick={onClose}>Відмінити</Button>
        <LoadingButton
          loadingPosition="end"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Створити
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
