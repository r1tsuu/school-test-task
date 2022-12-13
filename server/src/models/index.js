const { Sequelize, DataTypes } = require("sequelize");

const dbms = process.env.DBMS;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_NAME;
const url = process.env.DB_URL;

const sequelize = new Sequelize(`${dbms}://${user}:${password}@${url}/${db}`);

const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Teacher = sequelize.define("Teacher", {
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
  salaryRate: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
});

Teacher.belongsTo(Subject);

module.exports = {
  sequelize,
  Subject,
};
