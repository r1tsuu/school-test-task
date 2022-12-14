const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Teacher = sequelize.define("teacher", {
  name: {
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

Teacher.addScope(
  "defaultScope",
  {
    order: [["id", "ASC"]],
  },
  { override: true }
);

module.exports = Teacher;
