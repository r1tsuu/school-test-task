import { Box, Typography } from "@mui/material";
import { cloneElement } from "react";

export const CardList = ({ list }) => {
  return (
    <>
      {list.map(({ title, value, icon }) => (
        <Box pl={3} display="flex" key={title} position="relative" gap={3}>
          {icon && (
            <Box
              alignItems={"center"}
              display={"flex"}
              height={"100%"}
              position={"absolute"}
              left={-6}
            >
              {cloneElement(icon, {
                ...icon.props,
                ...(!icon.props.color && {
                  color: "action",
                }),
              })}
            </Box>
          )}
          <Typography color="text.secondary" variant="h5">
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
      ))}
    </>
  );
};
