const express = require("express");
const cors = require("cors");
const SubjectController = require("./controllers/Subject");
const TeacherController = require("./controllers/teacher");
const LessonController = require("./controllers/Lesson");
const { sequelize } = require("./models");

const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/api/subject", SubjectController);
app.use("/api/teacher", TeacherController);
app.use("/api/lesson", LessonController);

sequelize.sync().then((req) => {
  app.listen(port, async () => {
    console.log("Express app listen at port " + port);
  });
});

module.exports = app;
