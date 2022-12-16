const { Sequelize } = require("sequelize");

const dbms = process.env.DBMS;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_NAME;
const url = process.env.DB_URL;

const sequelize = new Sequelize(`${dbms}://${user}:${password}@${url}/${db}`, {
  logging: false,
});

module.exports = sequelize;
