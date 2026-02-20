import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminReports() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <button onClick={() => navigate('/admin')} style={{ color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>
      <h2 style={{ color: '#38bdf8' }}>Overall System Performance</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={reportStyles.card}>
          <h3>Placement Success Rate</h3>
          <p style={{ fontSize: '30px', color: '#2dd4bf' }}>88.5%</p>
          <div style={{ height: '8px', backgroundColor: '#0f172a', borderRadius: '4px' }}>
             <div style={{ width: '88%', height: '100%', backgroundColor: '#2dd4bf', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div style={reportStyles.card}>
          <h3>Active Students</h3>
          <p style={{ fontSize: '30px', color: '#38bdf8' }}>1,250</p>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>+12% Increase from last month</p>
        </div>
      </div>

      <div style={{ ...reportStyles.card, marginTop: '20px' }}>
        <h3>Platform Traffic</h3>
        <p style={{ color: '#94a3b8' }}>Real-time server status: <span style={{ color: '#2dd4bf' }}>Optimal</span></p>
        <p style={{ color: '#94a3b8' }}>API Response Time: <span style={{ color: '#38bdf8' }}>45ms</span></p>
      </div>
    </div>
  );
}

const reportStyles = {
  card: { backgroundColor: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155' }
};