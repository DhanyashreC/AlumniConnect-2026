import React from "react";

export default function Sidebar({ setView, activeView }) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: "📊", category: "ADMIN & CORE" },
    { id: "events", label: "Placement Drives", icon: "📅", category: "ADMIN & CORE" },
    { id: "analytics", label: "Analytics", icon: "📈", category: "ADMIN & CORE" },
    { id: "jobs", label: "Job Board", icon: "💼", category: "OPPORTUNITIES" },
    { id: "internships", label: "Internships", icon: "🚀", category: "OPPORTUNITIES" },
    { id: "profile", label: "Update Profile", icon: "👤", category: "SETTINGS" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logoText}>PlacementPro</h2>
      <div style={styles.menuSection}>
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Optional category labels */}
            <div style={styles.menuItem} 
                 onClick={() => setView(item.id)}
                 className={activeView === item.id ? "active" : ""}>
              <span style={{marginRight: '10px'}}>{item.icon}</span>
              {item.label}
            </div>
          </div>
        ))}
        <div style={styles.logout} onClick={() => window.location.href = "/login"}>🚪 Logout</div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: { width: "240px", backgroundColor: "#1e293b", height: "100vh", padding: "20px", position: "fixed", left: 0, top: 0 },
  logoText: { color: "#38bdf8", textAlign: "center", marginBottom: "30px" },
  menuItem: { 
    padding: "12px", 
    color: "#cbd5e1", 
    cursor: "pointer", 
    borderRadius: "8px",
    marginBottom: "5px",
    transition: "0.3s"
  },
  logout: { color: "#ef4444", marginTop: "20px", cursor: "pointer", padding: "12px" }
};