const Joi = require("joi");

const createSchema = Joi.object({
  startDate: Joi.string().required(),
  studentsCount: Joi.number().optional(),
  teacherId: Joi.number().required(),
});

const LessonService = {
  createSchema,
};

module.exports = LessonService;
