const Joi = require("joi");

const createSchema = Joi.object({
  startDate: Joi.string().required(),
  studentsCount: Joi.number().optional(),
  teacherId: Joi.number().required(),
  teacherSalary: Joi.number().required(),
  type: Joi.string().valid("individual", "group").required(),
});

const LessonService = {
  createSchema,
};

module.exports = LessonService;
