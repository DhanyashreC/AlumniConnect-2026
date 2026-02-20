import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ApplicationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);

  // 1. Catch the job details passed from JobBoard
  // If no state exists (e.g., direct URL access), we provide fallback values
  const job = location.state?.job || { id: Date.now(), role: "Position", company: "Company" };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. Prepare the application data
    const newApplication = {
      id: job.id,
      role: job.role,
      company: job.company,
      appliedDate: new Date().toLocaleDateString(),
      status: "Pending" // Consistent status for tracking
    };

    // 3. Save to localStorage (same key as Internships)
    const existingApps = JSON.parse(localStorage.getItem("myApplications")) || [];
    
    // Check for duplicates to prevent double-applying
    const alreadyApplied = existingApps.some(app => app.id === job.id);
    
    if (!alreadyApplied) {
      localStorage.setItem("myApplications", JSON.stringify([newApplication, ...existingApps]));
    }

    setSubmitted(true);

    // 4. Redirect to My Applications page after 2 seconds
    setTimeout(() => navigate('/applications'), 2000);
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <h2 style={{color: '#10b981'}}>✅ Application Submitted!</h2>
          <p>Redirecting you to your applications list...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <h2 style={styles.title}>Complete Your Application</h2>
        <p style={styles.subtitle}>
          Applying for: <span style={{color: '#38bdf8', fontWeight: 'bold'}}>{job.role} at {job.company}</span>
        </p>
        
        <label style={styles.label}>Full Name</label>
        <input type="text" placeholder="Enter Name" style={styles.input} required />
        
        <label style={styles.label}>Current CGPA</label>
        <input type="number" step="0.1" placeholder="e.g. 8.5" style={styles.input} required />
        
        <label style={styles.label}>Resume Link (Drive/Dropbox)</label>
        <input type="url" placeholder="https://..." style={styles.input} required />

        <div style={styles.buttonGroup}>
          <button type="button" onClick={() => navigate('/jobs')} style={styles.cancelBtn}>Cancel</button>
          <button type="submit" style={styles.submitBtn}>Submit Application</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' },
  formCard: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', border: '1px solid #334155', width: '100%', maxWidth: '500px' },
  successCard: { textAlign: 'center', backgroundColor: '#1e293b', padding: '50px', borderRadius: '16px', border: '1px solid #10b981' },
  title: { color: '#38bdf8', marginBottom: '10px' },
  subtitle: { color: '#94a3b8', marginBottom: '30px', fontSize: '14px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' },
  input: { width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none' },
  buttonGroup: { display: 'flex', gap: '15px', marginTop: '10px' },
  submitBtn: { flex: 2, backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  cancelBtn: { flex: 1, backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #334155', padding: '12px', borderRadius: '8px', cursor: 'pointer' }
};