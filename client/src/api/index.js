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
  const { data } = await client.post("/teacher", teacher);
  return data;
};

export const updateTeacher = async ({ id, teacher }) => {
  console.log(teacher);
  const { data } = await client.put(`/teacher/${id}`, teacher);
  return data;
};

export const deleteTeacher = async (id) => {
  const { data } = await client.delete(`/teacher/${id}`);
  return data;
};

export const fetchLessons = async () => {
  const { data } = await client.get("/lesson");
  return data;
};

export const createLesson = async (lesson) => {
  const { data } = await client.post("/lesson", lesson);
  return data;
};
