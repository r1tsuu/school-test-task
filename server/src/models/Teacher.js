const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Teacher = sequelize.define("teacher", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lessonsType: {
    type: DataTypes.STRING, // enum individual | group
    allowNull: false,
  },
  groupSalaryRate: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  individualSalaryRate: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Teacher;
