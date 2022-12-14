import { Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import { CardList } from "../../components/CardList";

export const LessonCard = ({
  type,
  teacherSalary,
  teacher,
  studentsCount,
  startDate,
}) => {
  const date = new Date(startDate);

  const list = [
    {
      title: "Предмет",
      value: teacher.subject.name,
    },
    {
      title: "Викладач",
      value: `${teacher.firstName} ${teacher.secondName} ${teacher.surname}`,
    },
    {
      title: "Дата уроку",
      value: date.toLocaleDateString(),
    },
    {
      title: "Час",
      value: date.toLocaleTimeString(),
    },
    {
      title: "Тип уроку",
      value:
        type === "individual"
          ? "Індивідуальний"
          : `Груповий, кількість студентів: ${studentsCount}`,
    },
    {
      title: "Зарплата викладача за урок",
      value: `${teacherSalary} грн`,
    },
  ];

  return (
    <Card>
      <CardContent>
        <CardList list={list} />
      </CardContent>
    </Card>
  );
};
