export const resolveTeacherSalaryForLesson = (teacher, lesson) => {
  if (lesson.type === "individual") return teacher.individualSalaryRate;
  return teacher.groupSalaryRate?.[lesson.studentsCount - 1];
};
