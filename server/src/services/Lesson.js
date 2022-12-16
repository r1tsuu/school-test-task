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
  return teacher.groupSalaryRate?.[lesson.studentsCount - 1];
};

const LessonService = {
  createSchema,
  resolveSalary,
  updateSchema,
  conductSchema,
};

module.exports = LessonService;
