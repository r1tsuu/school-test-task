const { Lesson, Subject, Teacher } = require("../models");

const TeacherService = require("../services/Teacher");

const TeacherController = require("express").Router();

TeacherController.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: Subject,
    });

    res.json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

TeacherController.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      where: {
        id: req.params.id,
      },
      include: Subject,
    });
    res.json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

TeacherController.post("/", async (req, res) => {
  const teacher = req.body;
  const result = TeacherService.createSchema.validate(teacher);
  if (result.error) {
    res.json("validation");
  } else {
    try {
      const createdTeacher = await Teacher.create(teacher);
      res.json(createdTeacher);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
});

TeacherController.put("/:id", async (req, res) => {
  const { error } = TeacherService.updateSchema.validate(req.body);

  if (error) {
    res.json("validation");
  } else {
    try {
      await Teacher.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.json("success");
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
});

TeacherController.delete("/:id", async (req, res) => {
  try {
    await Teacher.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json("success");
  } catch (error) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = TeacherController;
