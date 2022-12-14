import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

export const SubjectSelect = ({ subjects, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <FormLabel>Предмет</FormLabel>
      <Select onChange={onChange} value={value}>
        {subjects.map(({ id, name }) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
