import api from "./api";

export const createDrive = (data) => api.post("/drives", data);

export const getDrives = () => api.get("/drives");

export const getEligibleStudents = (id) =>
  api.get(`/drives/${id}/eligible`);

export const scheduleInterview = (data) =>
  api.post("/interviews", data);