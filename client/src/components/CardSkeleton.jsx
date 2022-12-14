import { Stack, Skeleton } from "@mui/material";

export const CardSkeleton = () => {
  return (
    <Stack spacing={0.4}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
    </Stack>
  );
};
