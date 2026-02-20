import { useState } from "react";
import { createDrive, getEligibleStudents } from "../services/tpoService";
import Sidebar from "../components/Sidebar";
import React from "react";

export default function Events() {
  const [form, setForm] = useState({
    company: "",
    minCGPA: "",
    maxBacklogs: "",
    branches: ""
  });

  const [eligible, setEligible] = useState([]);

  const handleCreate = async () => {
    try {
      const res = await createDrive({
        ...form,
        minCGPA: Number(form.minCGPA),
        maxBacklogs: Number(form.maxBacklogs),
        branches: form.branches.split(",").map(b => b.trim()) // Added trim to handle spaces
      });

      const students = await getEligibleStudents(res.data._id);
      setEligible(students.data);
    } catch (err) {
      console.error("Error creating drive:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", width: "100%" }}>
        <h2>Drive Management</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
          <input placeholder="Company"
            onChange={e => setForm({...form, company:e.target.value})} />

          <input placeholder="Min CGPA"
            onChange={e => setForm({...form, minCGPA:e.target.value})} />

          <input placeholder="Max Backlogs"
            onChange={e => setForm({...form, maxBacklogs:e.target.value})} />

          <input placeholder="Branches (comma separated)"
            onChange={e => setForm({...form, branches:e.target.value})} />

          <button onClick={handleCreate} style={{ padding: "10px", cursor: "pointer" }}>
            Create Drive & Find Students
          </button>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <h3>Eligible Students</h3>
        {eligible.length > 0 ? (
          eligible.map(s => (
            <div key={s._id} style={{ padding: "5px", borderBottom: "1px solid #eee" }}>
              {s.name}
            </div>
          ))
        ) : (
          <p>No eligible students found yet.</p>
        )}
      </div>
    </div>
  );
}