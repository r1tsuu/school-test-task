import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const TeacherCardSkeleton = () => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
    </Stack>
  );
};
