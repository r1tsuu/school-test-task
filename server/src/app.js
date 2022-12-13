const express = require("express");
const TeacherController = require("./controllers/teacher");
const sequelize = require("./models/database");
require("./models/Lesson");

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/api/teacher", TeacherController);

sequelize.sync().then((req) => {
  app.listen(port, async () => {
    console.log("Express app listen at port " + port);
  });
});

module.exports = app;
