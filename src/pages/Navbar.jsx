import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // Logic to handle scrolling when on the Home page
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.logo}>PlacementPro <span style={{fontSize: '20px'}}>🚀</span></div>
      
      <div style={navStyles.navLinks}>
        <span onClick={() => scrollToSection('home')} style={navStyles.navItem}>Home</span>
        <span onClick={() => scrollToSection('services')} style={navStyles.navItem}>Services</span>
        <Link to="/blog" style={navStyles.navItem}>Blog</Link>
        <span onClick={() => scrollToSection('about')} style={navStyles.navItem}>About</span>
        <span onClick={() => scrollToSection('contact')} style={navStyles.navItem}>Contact</span>
      </div>

      <div style={navStyles.authLinks}>
        <Link to="/login" style={navStyles.navItem}>Login</Link>
        <Link to="/register" style={navStyles.primaryBtnSmall}>Register</Link>
      </div>
    </nav>
  );
}

const navStyles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '20px 80px', 
    backgroundColor: '#020617', // Solid dark background so it's visible
    position: 'sticky', 
    top: 0, 
    zIndex: 1000, 
    borderBottom: '1px solid rgba(255,255,255,0.1)' 
  },
  logo: { fontSize: '24px', fontWeight: '800', color: '#fff' },
  navLinks: { display: 'flex', gap: '30px' },
  navItem: { 
    color: '#cbd5e1', 
    cursor: 'pointer', 
    fontSize: '14px', 
    fontWeight: '500', 
    textDecoration: 'none',
    transition: '0.3s'
  },
  authLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  primaryBtnSmall: { 
    backgroundColor: '#38bdf8', 
    color: '#020617', 
    padding: '10px 20px', 
    borderRadius: '8px', 
    textDecoration: 'none', 
    fontWeight: 'bold' 
  }
};