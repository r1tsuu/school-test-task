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
  isConducted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  teacherSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Lesson.addScope(
  "defaultScope",
  {
    order: [["id", "ASC"]],
  },
  { override: true }
);

module.exports = Lesson;
