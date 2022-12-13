const Joi = require("joi");

const createSchema = Joi.object({
  firstName: Joi.string(),
  secondName: Joi.string(),
  surname: Joi.string(),
  lessonsType: Joi.string().valid("individual", "group"),
  subjectId: Joi.number(),
  individualSalaryRate: Joi.number().optional(),
  groupSalaryRate: Joi.array().items(Joi.number()).optional(),
});

const updateSchema = Joi.object({
  firstName: Joi.string().optional(),
  secondName: Joi.string().optional(),
  surname: Joi.string().optional(),
  lessonsType: Joi.string().valid("individual", "group").optional(),
  subjectId: Joi.number().optional(),
  individualSalaryRate: Joi.number().optional(),
  groupSalaryRate: Joi.array().items(Joi.number()).optional(),
});

const TeacherService = {
  createSchema,
  updateSchema,
};

module.exports = TeacherService;
