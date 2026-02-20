import { useState } from "react";
import { scheduleInterview } from "../services/tpoService";
import Sidebar from "../components/Sidebar";
import React from "react";
export default function InterviewScheduler() {
  const [data, setData] = useState({});

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", width: "100%" }}>
        <h2>Interview Scheduler</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
          <label>Student ID</label>
          <input 
            placeholder="Enter Student ID"
            onChange={e => setData({...data, studentId: e.target.value})} 
          />

          <label>Interview Date</label>
          <input 
            type="date"
            onChange={e => setData({...data, date: e.target.value})} 
          />

          <label>Interview Time</label>
          <input 
            type="time"
            onChange={e => setData({...data, time: e.target.value})} 
          />

          <button 
            onClick={() => scheduleInterview(data)} 
            style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
          >
            Schedule Interview
          </button>
        </div>
      </div>
    </div>
  );
}