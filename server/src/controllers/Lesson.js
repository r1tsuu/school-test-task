const { Lesson } = require("../models");

const LessonService = require("../services/Lesson");

const LessonController = require("express").Router();

LessonController.get("/", async (req, res) => {});

LessonController.post("/", async (req, res) => {
  const lesson = req.body;

  const { error } = LessonService.createSchema.validate(lesson);

  if (error) {
    res.json("validation");
  } else {
    try {
      const createdLesson = await Lesson.create(lesson);
      res.json(createdLesson);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
});

LessonController.put("/", async (req, res) => {});

LessonController.delete("/", async (req, res) => {});

module.exports = LessonController;
