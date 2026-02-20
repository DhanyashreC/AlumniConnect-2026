import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostOffer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ company: '', role: '', package: '', deadline: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Offer for ${formData.company} posted successfully!`);
    navigate('/admin');
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.card}>
        <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Post New Job Offer</h2>
        <form onSubmit={handleSubmit}>
          <input 
            style={formStyles.input} 
            placeholder="Company Name (e.g., Google)" 
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required 
          />
          <input 
            style={formStyles.input} 
            placeholder="Job Role (e.g., Software Engineer)" 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            required 
          />
          <input 
            style={formStyles.input} 
            placeholder="Package (e.g., 12 LPA)" 
            onChange={(e) => setFormData({...formData, package: e.target.value})}
            required 
          />
          <label style={{ color: '#94a3b8', fontSize: '12px', display: 'block', textAlign: 'left', marginBottom: '5px' }}>Application Deadline</label>
          <input 
            type="date" 
            style={formStyles.input} 
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            required 
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={formStyles.btn}>Post Offer</button>
            <button type="button" style={{ ...formStyles.btn, backgroundColor: '#475569' }} onClick={() => navigate('/admin')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const formStyles = {
  container: { backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  card: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', width: '400px', border: '1px solid #334155' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' },
  btn: { flex: 1, padding: '12px', backgroundColor: '#38bdf8', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};