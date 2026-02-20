import api from "./api";

// Get all drives/events
export const getEvents = () => {
  return api.get("/events");
};

// Create drive
export const createEvent = (data) => {
  return api.post("/events", data);
};

// Get single event
export const getEventById = (id) => {
  return api.get(`/events/${id}`);
};

// Delete event
export const deleteEvent = (id) => {
  return api.delete(`/events/${id}`);
};