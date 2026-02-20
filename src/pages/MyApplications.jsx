import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyApplications() {
  const navigate = useNavigate();
  const [appliedList, setAppliedList] = useState([]);

  // Load applications from localStorage on mount
  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem("myApplications")) || [];
    setAppliedList(savedApps);
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/student')} style={styles.backBtn}>
        ← Back to Dashboard
      </button>
      <h1 style={styles.title}>My Applications</h1>
      
      <div style={styles.tableContainer}>
        {appliedList.length === 0 ? (
          <div style={styles.emptyState}>
            <p>You haven't applied to any jobs or internships yet.</p>
            <div style={{marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
               <button onClick={() => navigate('/jobs')} style={styles.browseBtn}>Browse Jobs</button>
               <button onClick={() => navigate('/internships')} style={styles.browseBtn}>Browse Internships</button>
            </div>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Applied Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedList.map((app, index) => {
                // Logic to determine if it's an internship or job based on ID or Title
                const isInternship = app.id.toString().includes('int') || app.role.toLowerCase().includes('intern');
                
                return (
                  <tr key={app.id || index} style={styles.row}>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.typeBadge,
                        backgroundColor: isInternship ? '#818cf8' : '#2dd4bf'
                      }}>
                        {isInternship ? 'Internship' : 'Job'}
                      </span>
                    </td>
                    <td style={styles.td}>{app.company}</td>
                    <td style={styles.td}>{app.role}</td>
                    <td style={styles.td}>{app.appliedDate}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: app.status === "Pending" ? "#f59e0b" : "#10b981"
                      }}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' },
  backBtn: { color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', fontSize: '16px' },
  title: { color: '#38bdf8', marginBottom: '30px', fontSize: '28px' },
  tableContainer: { backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155', overflowX: 'auto' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#94a3b8' },
  browseBtn: { color: '#38bdf8', background: 'none', border: '1px solid #38bdf8', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  headerRow: { borderBottom: '2px solid #334155' },
  th: { textAlign: 'left', padding: '15px', color: '#94a3b8', fontWeight: '600' },
  td: { padding: '15px', borderBottom: '1px solid #334155', color: '#cbd5e1' },
  typeBadge: { padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', color: '#fff', textTransform: 'uppercase' },
  statusBadge: { padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', display: 'inline-block' }
};