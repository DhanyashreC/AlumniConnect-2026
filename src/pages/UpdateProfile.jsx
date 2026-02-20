import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "",
    phone: localStorage.getItem("userPhone") || "",
    college: localStorage.getItem("userCollege") || "",
    education: localStorage.getItem("userEducation") || "",
    linkedin: localStorage.getItem("userLinkedin") || "",
    github: localStorage.getItem("userGithub") || ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userPhone", formData.phone);
    localStorage.setItem("userCollege", formData.college);
    localStorage.setItem("userEducation", formData.education);
    localStorage.setItem("userLinkedin", formData.linkedin);
    localStorage.setItem("userGithub", formData.github);

    alert("Account Updated Successfully!");
    navigate('/student');
  };

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // Clear specific session data or everything
      localStorage.clear(); 
      navigate('/'); // Redirect to login/landing page
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.miniNav}>
        <button onClick={() => navigate('/student')} style={styles.backBtn}>
          ← Back to Dashboard
        </button>
        {/* Optional: Logout in Top Nav */}
        <button onClick={handleLogout} style={styles.navLogoutBtn}>Logout</button>
      </nav>

      <div style={styles.formCard}>
        <h2 style={styles.title}>Update Account Information</h2>
        <p style={styles.subtitle}>Keep your profile details up to date for recruiters.</p>
        
        <form onSubmit={handleSave}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              style={styles.input} 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required
            />
          </div>

          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input 
                style={styles.input} 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>College Name</label>
              <input 
                style={styles.input} 
                type="text" 
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})} 
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Education Info</label>
            <input 
              style={styles.input} 
              type="text" 
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>LinkedIn URL</label>
            <input 
              style={styles.input} 
              type="url" 
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>GitHub URL</label>
            <input 
              style={styles.input} 
              type="url" 
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})} 
            />
          </div>

          <button type="submit" style={styles.saveBtn}>Save Changes</button>
        </form>

        {/* --- DANGER ZONE LOGOUT --- */}
        <div style={styles.dangerZone}>
           <p style={styles.dangerText}>End your current session?</p>
           <button onClick={handleLogout} style={styles.logoutBtn}>Logout from PlacementPro</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' },
  miniNav: { maxWidth: '600px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  navLogoutBtn: { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  formCard: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '15px', maxWidth: '600px', margin: '0 auto', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' },
  title: { color: '#38bdf8', textAlign: 'center', marginBottom: '10px', fontSize: '24px' },
  subtitle: { color: '#94a3b8', textAlign: 'center', marginBottom: '30px', fontSize: '14px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none', boxSizing: 'border-box' },
  saveBtn: { width: '100%', backgroundColor: '#38bdf8', color: '#0f172a', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
  
  // Logout Styles
  dangerZone: { marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #334155', textAlign: 'center' },
  dangerText: { color: '#94a3b8', fontSize: '12px', marginBottom: '10px' },
  logoutBtn: { background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.3s' }
};