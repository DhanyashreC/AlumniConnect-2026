import axios from "axios";
import React from "react";

const API_URL = "http://localhost:5000/api/analytics"; 

export const getStats = async () => {
  return await axios.get(`${API_URL}/stats`);
};

export const getSkillGap = async () => {
  return await axios.get(`${API_URL}/skill-gap`);
};