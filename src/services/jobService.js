import api from "./api";

// Get all jobs
export const getJobs = () => {
  return api.get("/jobs");
};

// Get job by ID
export const getJobById = (id) => {
  return api.get(`/jobs/${id}`);
};

// Post job (alumni)
export const createJob = (data) => {
  return api.post("/jobs", data);
};

// Delete job
export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}`);
};