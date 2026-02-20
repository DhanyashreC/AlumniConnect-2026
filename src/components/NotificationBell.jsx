import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell'; // <-- Import it here

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/student')}>
        PlacementPro
      </div>

      <div style={styles.navActions}>
        {/* Add the Bell Component right here */}
        <NotificationBell /> 
        
        <div style={styles.profileIcon}>M</div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '10px 40px', 
    backgroundColor: '#0f172a', 
    borderBottom: '1px solid #1e293b' 
  },
  logo: { color: '#38bdf8', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' },
  navActions: { display: 'flex', alignItems: 'center', gap: '20px' },
  profileIcon: { 
    width: '35px', 
    height: '35px', 
    borderRadius: '50%', 
    backgroundColor: '#38bdf8', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#0f172a', 
    fontWeight: 'bold' 
  }
};