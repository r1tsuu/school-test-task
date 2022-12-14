import { Box, Typography } from "@mui/material";

export const CardList = ({ list }) => {
  return (
    <>
      {list.map(({ title, value }) => (
        <Box display="flex" key={title} gap={3}>
          <Typography color="text.secondary" variant="h5">
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
      ))}
    </>
  );
};
