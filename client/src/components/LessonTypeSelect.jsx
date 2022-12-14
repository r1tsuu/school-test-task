import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

export const LessonTypeSelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <FormLabel>Тип уроків</FormLabel>
      <RadioGroup value={value} onChange={onChange}>
        <FormControlLabel
          value="individual"
          control={<Radio />}
          label="Індивідуальні"
        />
        <FormControlLabel value="group" control={<Radio />} label="Групові" />
      </RadioGroup>
    </FormControl>
  );
};
