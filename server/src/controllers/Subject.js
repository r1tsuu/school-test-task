const { Subject } = require("../models");

const SubjectController = require("express").Router();

SubjectController.get("/", async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = SubjectController;
