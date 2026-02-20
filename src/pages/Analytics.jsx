import { useEffect, useState } from "react";
import { getStats, getSkillGap } from "../services/analyticsService";
import Sidebar from "../components/Sidebar";
import React from "react";

export default function Analytics() {
  const [stats, setStats] = useState({ placed: 0, unplaced: 0 });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const s = await getStats();
        const g = await getSkillGap();
        setStats(s.data || { placed: 0, unplaced: 0 });
        setSkills(g.data || []);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    };
    loadData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flex: 1 }}>
        <h2>Analytics Dashboard</h2>
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc" }}>
          <p><strong>Placed Students:</strong> {stats.placed}</p>
          <p><strong>Unplaced Students:</strong> {stats.unplaced}</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3>Skill Gap Analysis</h3>
          {skills.length > 0 ? (
            skills.map((skill, i) => <div key={i} style={{padding: "5px"}}>{skill}</div>)
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}