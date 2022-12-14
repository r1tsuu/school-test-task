const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Lesson = sequelize.define("lesson", {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  studentsCount: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Lesson;
