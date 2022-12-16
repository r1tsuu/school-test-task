const Joi = require("joi");

const createSchema = Joi.object({
  startDate: Joi.string().required(),
  time: Joi.number().valid(30, 60, 90, 120, 150, 180).required(),
  studentsCount: Joi.number().optional(),
  teacherId: Joi.number().required(),
  subjectId: Joi.number().required(),
  type: Joi.string().valid("individual", "group").required(),
});

const updateSchema = Joi.object({
  startDate: Joi.string().optional(),
  time: Joi.number().valid(30, 60, 90, 120, 150, 180).optional(),
  studentsCount: Joi.number().optional(),
  teacherId: Joi.number().required(),
  subjectId: Joi.number().optional(),
  type: Joi.string().valid("individual", "group").required(),
});

const conductSchema = Joi.object({
  isConducted: Joi.bool().required(),
});

const resolveSalary = (teacher, lesson) => {
  if (lesson.type === "individual") return teacher.individualSalaryRate;
  const { studentsCount } = lesson;

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

const LessonService = {
  createSchema,
  resolveSalary,
  updateSchema,
  conductSchema,
};

module.exports = LessonService;
