import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const TeacherCardSkeleton = () => {
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
