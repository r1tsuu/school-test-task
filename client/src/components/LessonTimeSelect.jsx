import { Select, MenuItem, FormControl, FormLabel } from "@mui/material";
import { timeSelectOptions } from "../utils/constants";

export const LessonTimeSelect = ({ value, onChange }) => {
  return (
    <FormControl
      sx={{
        gap: 0.5,
      }}
      fullWidth
    >
      <FormLabel>Час проведення</FormLabel>
      <Select onChange={onChange} value={value}>
        {timeSelectOptions.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
