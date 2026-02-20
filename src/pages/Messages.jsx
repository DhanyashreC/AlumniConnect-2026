import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyApplications() {
  const navigate = useNavigate();
  const [appliedList, setAppliedList] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem("myApplications")) || [];
    setAppliedList(savedApps);
  }, []);

  // Function to withdraw/delete an application
  const handleWithdraw = (id) => {
    const updatedList = appliedList.filter(app => app.id !== id);
    localStorage.setItem("myApplications", JSON.stringify(updatedList));
    setAppliedList(updatedList);
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/student')} style={styles.backBtn}>← Back to Dashboard</button>
      <h1 style={styles.title}>My Applications</h1>
      
      <div style={styles.tableContainer}>
        {appliedList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            <p>You haven't applied to any jobs yet.</p>
            <button 
              onClick={() => navigate('/jobs')} 
              style={{ ...styles.backBtn, marginTop: '10px', textDecoration: 'underline' }}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Applied Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedList.map((app) => (
                <tr key={app.id} style={styles.row}>
                  <td style={styles.td}>{app.company}</td>
                  <td style={styles.td}>{app.role}</td>
                  <td style={styles.td}>{app.appliedDate}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: 
                        app.status === "Interviewing" ? "#0ea5e9" : 
                        app.status === "Rejected" ? "#ef4444" : 
                        app.status === "Pending" ? "#f59e0b" : "#10b981"
                    }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => handleWithdraw(app.id)}
                      style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' },
  backBtn: { color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' },
  title: { color: '#38bdf8', marginBottom: '30px' },
  tableContainer: { backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { borderBottom: '1px solid #334155' },
  th: { textAlign: 'left', padding: '15px', color: '#94a3b8' },
  td: { padding: '15px', borderBottom: '1px solid #334155' },
  statusBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }
};