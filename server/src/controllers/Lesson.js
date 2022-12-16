const { Lesson, Teacher, Subject } = require("../models");

const LessonService = require("../services/Lesson");

const LessonController = require("express").Router();

LessonController.get("/", async (req, res) => {
  const isConducted = req.query;
  try {
    const lessons = await Lesson.findAll({
      include: {
        model: Teacher,
        include: Subject,
      },
    });
    res.json(lessons);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

LessonController.post("/", async (req, res) => {
  const lesson = req.body;

  const { error } = LessonService.createSchema.validate(lesson);

  if (error) {
    res.json("validation");
  } else {
    try {
      const teacher = await Teacher.findOne({
        where: {
          id: lesson.teacherId,
        },
      });
      const createdLesson = await Lesson.create({
        ...lesson,
        teacherSalary: LessonService.resolveSalary(teacher, lesson),
      });

      res.json(createdLesson);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
});

LessonController.put("/:id", async (req, res) => {
  const lesson = req.body;
  const id = req.params.id;

  const { error } = LessonService.updateSchema.validate(lesson);

  if (error) {
    return res.status(400).send();
  }

  try {
    const teacher = await Teacher.findOne({
      where: {
        id: lesson.teacherId,
      },
    });

    await Lesson.update(
      {
        ...lesson,
        teacherSalary: LessonService.resolveSalary(lesson, teacher),
      },
      {
        where: {
          id,
        },
      }
    );

    res.json("success");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

LessonController.put("/conduct/:id", async (req, res) => {
  const { error } = LessonService.conductSchema.validate(req.body);

  if (error) {
    return res.status(400).send();
  }
  try {
    await Lesson.update(
      {
        isConducted: req.body.isConducted,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json("success");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

LessonController.delete("/:id", async (req, res) => {
  try {
    await Lesson.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json("success");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = LessonController;
