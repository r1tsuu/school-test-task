import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const fetchSubjects = async () => {
  const { data } = await client.get("/subject");
  return data;
};

export const fetchTeachers = async () => {
  const { data } = await client.get("/teacher");
  return data;
};

export const createTeacher = async (teacher) => {
  await client.post("/teacher", teacher);
};

export const updateTeacher = async ({ id, teacher }) => {
  await client.put(`/teacher/${id}`, teacher);
};

export const deleteTeacher = async (id) => {
  await client.delete(`/teacher/${id}`);
};

export const fetchLessons = async (isConducted) => {
  const { data } = await client.get(`/lesson`);
  return data;
};

export const createLesson = async (lesson) => {
  await client.post("/lesson", lesson);
};

export const updateLesson = async ({ id, lesson }) => {
  await client.put(`/lesson/${id}`, lesson);
};

export const conductLesson = async ({ id, isConducted }) => {
  await client.put(`/lesson/conduct/${id}`, { isConducted });
};

export const deleteLesson = async (id) => {
  await client.delete(`/lesson/${id}`);
};
