import {
  IconButton,
  Card,
  CardActions,
  Button,
  CardContent,
  Typography,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Box } from "@mui/system";

const CardRow = ({ title, value }) => {
  return (
    <Box display="flex" gap={3}>
      <Typography color="text.secondary" variant="h5">
        {title}
      </Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  );
};

export const TeacherCard = ({
  firstName,
  secondName,
  surname,
  lessonsType,
  individualSalaryRate,
  groupSalaryRate,
  subjectName,
  onOpenUpdateDialog,
  onOpenDeleteDialog,
}) => {
  const list = [
    {
      title: "Ім'я",
      value: firstName,
    },
    {
      title: "Прізвище",
      value: secondName,
    },
    {
      title: "По батькові",
      value: surname,
    },
    {
      title: "Предмет",
      value: subjectName,
    },
    {
      title: "Тип уроків",
      value: lessonsType === "individual" ? "Індивідуальні" : "Групові",
    },
    {
      title: "Зарплатна ставка",
      value:
        lessonsType === "individual" ? (
          `${individualSalaryRate} грн`
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6].map(
              (count) => `${count}: ${groupSalaryRate[count - 1]} грн`
            )}
          </>
        ),
    },
  ];

  return (
    <Card
      sx={{
        overflow: "auto",
      }}
    >
      <CardContent>
        {list.map(({ title, value }) => (
          <CardRow title={title} value={value} key={title} />
        ))}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onOpenUpdateDialog}>Редагувати</Button>
        <IconButton onClick={onOpenDeleteDialog}>
          <PersonRemoveIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
