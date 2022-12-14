const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Subject = sequelize.define("subject", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Subject.addScope(
  "defaultScope",
  {
    order: [["id", "ASC"]],
  },
  { override: true }
);

module.exports = Subject;
