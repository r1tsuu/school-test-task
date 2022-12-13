require("dotenv").config();

const sequelize = require("./src/models/database");
const Subject = require("./src/models/Subject");

const subjects = [
  "Математика",
  "Англійська мова",
  "Українська мова",
  "Фізика",
  "Хімія",
];

async function initSubjects() {
  try {
    await Subject.bulkCreate(
      subjects.map((subject) => ({
        name: subject,
      }))
    );
    console.log("Successfully created subjects: ", JSON.stringify(subjects));
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}

sequelize.sync().then(() => {
  initSubjects();
});
