const Subject = require("../models/Subject");
const Teacher = require("../models/Teacher");
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

  try {
    await TeacherService.createSchema.validateAsync(teacher);
  } catch (error) {
    res.json("validation");
  }

  try {
    const dbTeacher = await Teacher.create(teacher);
    res.json(dbTeacher);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

TeacherController.put("/:id", async (req, res) => {
  try {
    await TeacherService.updateSchema.validateAsync(req.body);
    try {
      await Teacher.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      const updatedTeacher = await Teacher.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.json(updatedTeacher);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  } catch (err) {
    res.json("validation");
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
