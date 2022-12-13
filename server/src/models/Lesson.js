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
});

module.exports = Lesson;
