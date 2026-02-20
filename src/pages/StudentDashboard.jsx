import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();
  
  // Dynamically gets the user name set during Login/Register
  const [studentName] = useState(() => {
    return localStorage.getItem("userName") || "Guest User";
  });

  // Full list of 5 options matching your latest dashboard layout
  const options = [
    { title: "Apply Jobs", icon: "💼", stats: "24 New", path: "/jobs" },
    { title: "Apply Internships", icon: "🎓", stats: "45 New", path: "/internships" },
    { title: "Network & Connect", icon: "🤝", stats: "1.2k", path: "/network" },
    { title: "My Applications", icon: "📄", stats: "3 Pending", path: "/applications" },
    { title: "Skill Assessment", icon: "🚀", stats: "Practice", path: "/assessments" } 
  ];

  return (
    <div style={styles.container}>
      {/* --- TOP NAVBAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>PlacementPro</span>
          <div style={styles.homeBtn} onClick={() => navigate('/')}>
            🏠 <span style={styles.homeText}>Home</span>
          </div>
        </div>
        
        <div style={styles.navRight}>
          {/* Clicking name/avatar redirects to the account update page */}
          <div style={styles.profileArea} onClick={() => navigate('/update-profile')}>
            <span style={styles.userName}>{studentName}</span>
            <div style={styles.avatar}>{studentName[0].toUpperCase()}</div>
          </div>
        </div>
      </nav>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <div style={styles.main}>
        <h1 style={styles.title}>Student Dashboard</h1>
        
        <div style={styles.grid}>
          {options.map((opt, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.icon}>{opt.icon}</div>
              <h3 style={styles.cardTitle}>{opt.title}</h3>
              <p style={styles.stats}>{opt.stats}</p>
              <button 
                style={styles.exploreBtn} 
                onClick={() => navigate(opt.path)}
              >
                {opt.title === "Network & Connect" ? "Connect" : "Explore"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' },
  navLeft: { display: 'flex', alignItems: 'center', gap: '25px' },
  logo: { color: '#38bdf8', fontWeight: 'bold', fontSize: '22px', letterSpacing: '0.5px' },
  homeBtn: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' },
  homeText: { color: '#94a3b8' },
  navRight: { position: 'relative' },
  profileArea: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  userName: { fontSize: '15px', fontWeight: '500' },
  avatar: { width: '38px', height: '38px', backgroundColor: '#38bdf8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0f172a' },
  main: { padding: '60px 40px' },
  title: { fontSize: '36px', color: '#38bdf8', marginBottom: '40px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' },
  card: { backgroundColor: '#1e293b', padding: '35px 25px', borderRadius: '18px', border: '1px solid #334155', textAlign: 'center' },
  icon: { fontSize: '45px', marginBottom: '15px' },
  cardTitle: { color: '#38bdf8', fontSize: '20px', marginBottom: '8px' },
  stats: { fontSize: '13px', color: '#10b981', fontWeight: 'bold', marginBottom: '25px' },
  exploreBtn: { width: '100%', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }
};