const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Subject = require("./Subject");
const Teacher = require("./Teacher");

const Lesson = sequelize.define("lesson", {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  studentsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // enum individual | group
    allowNull: false,
  },
});

Lesson.belongsTo(Teacher); // teacherId in LESSONS
Lesson.belongsTo(Subject); // subjectId in LESSONS

module.exports = Lesson;
