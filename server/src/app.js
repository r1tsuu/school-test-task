const express = require("express");
const { sequelize } = require("./models");

const app = express();

const port = process.env.PORT;

app.use(express.json());

sequelize.sync().then((req) => {
  app.listen(port, async () => {
    console.log("Express app listen at port " + port);
  });
});

module.exports = app;
