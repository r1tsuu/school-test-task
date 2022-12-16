export const resolveSalary = (type, teacher, studentsCount, time) => {
  if (!teacher) return null;
  if (type === "individual") return (teacher.individualSalaryRate * time) / 60;

  const getGroupSalaryWithoutTime = () => {
    switch (studentsCount) {
      case 1:
        return teacher.groupSalaryRateOne;
      case 2:
        return teacher.groupSalaryRateTwo;
      case 3:
        return teacher.groupSalaryRateThree;
      default:
        return (
          teacher.groupSalaryRateThree +
          (studentsCount - 3) * teacher.groupSalaryRateDifference
        );
    }
  };

  return (getGroupSalaryWithoutTime() * time) / 60;
};
