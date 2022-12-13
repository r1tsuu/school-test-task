const sequelize = require("./database");

const Teacher = require("./Teacher");
const Lesson = require("./Lesson");
const Subject = require("./Subject");

Teacher.belongsTo(Subject);
Teacher.hasMany(Lesson);
Lesson.belongsTo(Teacher);

module.exports = {
  sequelize,
  Teacher,
  Lesson,
  Subject,
};
