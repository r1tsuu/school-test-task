import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const fetchSubjects = () => {
  return client.get("/subject");
};

export const fetchTeachers = () => {
  return client.get("/teacher");
};

export const createTeacher = (teacher) => {
  return client.post("/teacher", teacher);
};

export const updateTeacher = (id, teacher) => {
  return client.put(`/teacher/${id}`, teacher);
};

export const deleteTeacher = (id) => {
  return client.delete(`/teacher/${id}`);
};

export const fetchLessons = () => {
  return client.get("/lesson");
};

export const createLesson = (lesson) => {
  return client.post("/lesson", lesson);
};
