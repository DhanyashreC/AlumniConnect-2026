import { useState } from "react";
import { scheduleInterview } from "../services/tpoService";
import Sidebar from "../components/Sidebar";
import React from "react";

export default function InterviewScheduler() {
  const [data, setData] = useState({});

  return (
    <div style={styles.dashboardContainer}>
      <Sidebar />
      
      {/* --- Main Content Area --- */}
      <div style={styles.mainContent}>
        
        {/* --- Alignment Wrapper --- */}
        <div style={styles.contentWrapper}>
          <h2 style={styles.pageTitle}>Interview Scheduler</h2>

          {/* --- Styled Form Card --- */}
          <div style={styles.formCard}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Student ID</label>
              <input 
                placeholder="Enter Student ID"
                style={styles.input}
                onChange={e => setData({...data, studentId: e.target.value})} 
              />
              return (
    <div style={styles.dashboardContainer}>
      <Sidebar />
      <div style={styles.mainContent}>
        
        {/* This wrapper ensures the Title and Form start at the same left line */}
        <div style={styles.contentWrapper}>
          <h2 style={styles.pageTitle}>Interview Scheduler</h2>

          {/* Styled precisely like your Internship/Drive cards */}
          <div style={styles.formCard}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Student ID</label>
              <input 
                placeholder="Enter Student ID"
                style={styles.input}
                onChange={e => setData({...data, studentId: e.target.value})} 
              />

              <label style={styles.label}>Interview Date</label>
              <input 
                type="date"
                style={styles.input}
                onChange={e => setData({...data, date: e.target.value})} 
              />

              <label style={styles.label}>Interview Time</label>
              <input 
                type="time"
                style={styles.input}
                onChange={e => setData({...data, time: e.target.value})} 
              />

              <button 
                onClick={() => scheduleInterview(data)} 
                style={styles.primaryBtn}
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

              <label style={styles.label}>Interview Date</label>
              <input 
                type="date"
                style={styles.input}
                onChange={e => setData({...data, date: e.target.value})} 
              />

              <label style={styles.label}>Interview Time</label>
              <input 
                type="time"
                style={styles.input}
                onChange={e => setData({...data, time: e.target.value})} 
              />

              <button 
                onClick={() => scheduleInterview(data)} 
                style={styles.primaryBtn}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: { 
    display: "flex", 
    backgroundColor: "#020617", 
    minHeight: "100vh",
    color: "#f8fafc"
  },
  mainContent: { 
    padding: "40px 20px", 
    width: "100%", 
    display: "flex", 
    justifyContent: "center" // Aligns content to center horizontally
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "800px", // Keeps the form from getting too wide
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#38bdf8", // Signature blue
    marginBottom: "10px"
  },
  formCard: {
    backgroundColor: "#0f172a",
    padding: "40px",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
  },
  formGroup: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px" 
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#94a3b8"
  },
  input: { 
    padding: "12px 16px",
    backgroundColor: "#020617",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box"
  },
  primaryBtn: { 
    padding: "14px", 
    marginTop: "10px", 
    cursor: "pointer",
    backgroundColor: "#38bdf8",
    color: "#020617",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.3s ease"
  }
};