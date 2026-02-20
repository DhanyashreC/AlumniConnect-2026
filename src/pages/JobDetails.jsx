import { useParams, useNavigate } from "react-router-dom";
import React from "react";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleApply = () => {
    // 1. Force a check on the data
    const jobToSave = {
      id: id || Date.now().toString(), // Fallback if ID is missing
      role: "Software Engineer",
      company: "Google", 
      appliedDate: new Date().toLocaleDateString(),
      status: "Pending" 
    };

    // 2. Get and Update
    const currentApps = JSON.parse(localStorage.getItem("myApplications")) || [];
    
    // Check for duplicates
    if (currentApps.find(a => a.id === jobToSave.id)) {
      alert("Already applied!");
      return;
    }

    const updatedApps = [jobToSave, ...currentApps];
    
    // 3. Save
    localStorage.setItem("myApplications", JSON.stringify(updatedApps));
    
    console.log("Saved successfully:", updatedApps);
    alert("Applied!");
    navigate("/applications"); 
  };

  return (
    <div style={{ padding: '40px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h2>Job Details</h2>
      <button 
        onClick={handleApply} 
        style={{ padding: '10px 20px', backgroundColor: '#38bdf8', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        Apply Now
      </button>
    </div>
  );
}