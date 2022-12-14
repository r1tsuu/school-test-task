const Joi = require("joi");

const createSchema = Joi.object().keys({
  name: Joi.string().required(),
  lessonsType: Joi.string().valid("individual", "group").required(),
  subjectId: Joi.number().required(),
  individualSalaryRate: Joi.number().optional(),
  groupSalaryRate: Joi.array().items(Joi.number()).optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
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
