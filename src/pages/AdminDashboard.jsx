import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Sub-Components ---

const StatCard = ({ label, val, color }) => (
  <div style={styles.statCard}>
    <h3 style={{ color, fontSize: '32px', margin: 0 }}>{val}</h3>
    <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontWeight: 'bold' }}>{label}</p>
  </div>
);

const ManageUsers = ({ studentList, alumniList }) => {
  const allUsers = [
    ...studentList.map(s => ({ ...s, type: 'Student' })),
    ...alumniList.map(a => ({ ...a, type: 'Alumni' }))
  ];

  return (
    <div style={styles.section}>
      <h2 style={styles.tabTitle}>User Directory ({allUsers.length})</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Name</th><th>Email</th><th>Dept / Company</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((u, i) => (
            <tr key={i} style={styles.tableRow}>
              <td style={{ fontWeight: '500' }}>{u.name || 'User'}</td>
              <td>{u.email}</td>
              <td>{u.type === 'Student' ? (u.dept || 'Engineering') : (u.company || 'N/A')}</td>
              <td>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  backgroundColor: u.type === 'Student' ? '#064e3b' : '#451a03',
                  color: u.type === 'Student' ? '#34d399' : '#fbbf24',
                  border: `1px solid ${u.type === 'Student' ? '#34d399' : '#fbbf24'}`
                }}>
                  {u.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageDrives = ({ 
  driveList, showDriveForm, setShowDriveForm, 
  newDrive, setNewDrive, handlePostDrive, deleteDrive 
}) => (
  <div style={styles.section}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2 style={{ margin: 0, color: '#38bdf8' }}>Placement Drives</h2>
      <button style={styles.actionBtn} onClick={() => setShowDriveForm(true)}>+ Add New Company</button>
    </div>

    {showDriveForm && (
      <form onSubmit={handlePostDrive} style={styles.driveForm}>
        <h4 style={{ marginTop: 0 }}>Company Details</h4>
        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Company Name" value={newDrive.company} onChange={e => setNewDrive({ ...newDrive, company: e.target.value })} />
          <input style={styles.input} placeholder="Job Role" value={newDrive.role} onChange={e => setNewDrive({ ...newDrive, role: e.target.value })} />
          <input style={styles.input} placeholder="Package" value={newDrive.package} onChange={e => setNewDrive({ ...newDrive, package: e.target.value })} />
          <input style={styles.input} placeholder="Location" value={newDrive.location} onChange={e => setNewDrive({ ...newDrive, location: e.target.value })} />
          <input style={styles.input} type="date" value={newDrive.deadline} onChange={e => setNewDrive({ ...newDrive, deadline: e.target.value })} />
        </div>
        <textarea style={{ ...styles.textarea, height: '60px', marginTop: '10px' }} placeholder="Job Description" value={newDrive.description} onChange={e => setNewDrive({ ...newDrive, description: e.target.value })} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button type="submit" style={styles.actionBtn}>Post to Students</button>
          <button type="button" style={{ ...styles.actionBtn, backgroundColor: '#475569' }} onClick={() => setShowDriveForm(false)}>Cancel</button>
        </div>
      </form>
    )}

    <table style={styles.table}>
      <thead>
        <tr style={styles.tableHeader}>
          <th>Company</th><th>Role</th><th>Package</th><th>Posted On</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {driveList.length > 0 ? driveList.map((d) => (
          <tr key={d.id} style={styles.tableRow}>
            <td style={{ fontWeight: 'bold' }}>{d.company}</td>
            <td>{d.role}</td><td>{d.package}</td><td>{d.postedOn}</td>
            <td><button onClick={() => deleteDrive(d.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button></td>
          </tr>
        )) : <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No active drives.</td></tr>}
      </tbody>
    </table>
  </div>
);

const AnalyticsTab = () => (
  <div style={styles.section}>
    <h2 style={styles.tabTitle}>Detailed Activity Reports</h2>
    <div style={styles.analyticsGrid}>
      <div style={styles.chartCard}>
        <h4 style={styles.chartTitle}>Branch-wise Placements</h4>
        <div style={styles.barContainer}>
          <div style={{ ...styles.bar, height: '80%', backgroundColor: '#38bdf8' }}><span style={styles.barLabel}>CSE</span></div>
          <div style={{ ...styles.bar, height: '60%', backgroundColor: '#fbbf24' }}><span style={styles.barLabel}>ECE</span></div>
          <div style={{ ...styles.bar, height: '40%', backgroundColor: '#f87171' }}><span style={styles.barLabel}>MECH</span></div>
          <div style={{ ...styles.bar, height: '90%', backgroundColor: '#2dd4bf' }}><span style={styles.barLabel}>AIML</span></div>
        </div>
      </div>
      <div style={styles.chartCard}>
        <h4 style={styles.chartTitle}>Overall Student Status</h4>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '15px', marginTop: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}><span>Placed Students</span><span>72%</span></div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#0f172a', borderRadius: '4px' }}><div style={{ width: '72%', height: '100%', backgroundColor: '#2dd4bf', borderRadius: '4px' }}></div></div>
          </div>
        </div>
      </div>
      <div style={styles.chartCard}>
        <h4 style={styles.chartTitle}>Monthly Recruitment Trend</h4>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px', width: '100%', padding: '10px' }}>
          {[30, 50, 85, 65, 95, 40].map((h, i) => (<div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: h > 70 ? '#38bdf8' : '#334155', borderRadius: '2px' }}></div>))}
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [studentList, setStudentList] = useState([]);
  const [alumniList, setAlumniList] = useState([]);
  const [driveList, setDriveList] = useState([]);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifText, setNotifText] = useState("");
  const [showDriveForm, setShowDriveForm] = useState(false);
  const [newDrive, setNewDrive] = useState({ company: "", role: "", package: "", location: "", deadline: "", description: "" });
  const [realTimeStats, setRealTimeStats] = useState({ students: 0, alumni: 0, drives: 0, placementRate: 88 });
  const navigate = useNavigate();

  const fetchData = () => {
    const savedUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const students = savedUsers.filter(u => u.role === 'student');
    const alumni = savedUsers.filter(u => u.role === 'alumni');
    const drives = JSON.parse(localStorage.getItem("allDrives")) || [];

    setStudentList(students);
    setAlumniList(alumni);
    setDriveList(drives);
    setRealTimeStats({ students: students.length, alumni: alumni.length, drives: drives.length, placementRate: 88 });
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handlePostDrive = (e) => {
    e.preventDefault();
    const driveToAdd = { ...newDrive, id: Date.now(), postedOn: new Date().toLocaleDateString() };
    const existingDrives = JSON.parse(localStorage.getItem("allDrives")) || [];
    localStorage.setItem("allDrives", JSON.stringify([driveToAdd, ...existingDrives]));
    setShowDriveForm(false);
    fetchData();
  };

  const deleteDrive = (id) => {
    const filtered = driveList.filter(d => d.id !== id);
    localStorage.setItem("allDrives", JSON.stringify(filtered));
    fetchData();
  };

  const handleSendNotification = () => {
    const existingNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
    const newNotif = { id: Date.now(), text: notifText, date: new Date().toLocaleString(), sender: "Admin" };
    localStorage.setItem("notifications", JSON.stringify([newNotif, ...existingNotifs]));
    setShowNotifModal(false); setNotifText(""); alert("Notification Sent!");
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Overview': return (
        <div>
          <h1 style={styles.tabTitle}>Admin Command Center</h1>
          <div style={styles.statsGrid}>
            <StatCard label="Total Students" val={realTimeStats.students} color="#38bdf8" />
            <StatCard label="Total Alumni" val={realTimeStats.alumni} color="#fbbf24" />
            <StatCard label="Active Drives" val={realTimeStats.drives} color="#f87171" />
            <StatCard label="Placement Rate" val={realTimeStats.placementRate + "%"} color="#2dd4bf" />
          </div>
          <div style={styles.section}>
            <h3 style={{ marginTop: 0, color: '#38bdf8' }}>Quick Actions</h3>
            <div style={styles.actionGrid}>
              <button style={styles.dashboardBtn} onClick={() => setActiveTab('Drives')}>Add Drive</button>
              <button style={styles.dashboardBtn} onClick={() => setShowNotifModal(true)}>Send Notification</button>
              <button style={styles.dashboardBtn} onClick={() => setActiveTab('Users')}>User Management</button>
              <button style={styles.dashboardBtn} onClick={() => setActiveTab('Analytics')}>Full Reports</button>
            </div>
          </div>
        </div>
      );
      case 'Users': return <ManageUsers studentList={studentList} alumniList={alumniList} />;
      case 'Drives': return <ManageDrives driveList={driveList} showDriveForm={showDriveForm} setShowDriveForm={setShowDriveForm} newDrive={newDrive} setNewDrive={setNewDrive} handlePostDrive={handlePostDrive} deleteDrive={deleteDrive} />;
      case 'Analytics': return <AnalyticsTab />;
      default: return null;
    }
  };

  return (
    <div style={styles.layout}>
      {showNotifModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Global Announcement</h3>
            <textarea style={styles.textarea} value={notifText} onChange={(e) => setNotifText(e.target.value)} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button style={styles.actionBtn} onClick={handleSendNotification}>Broadcast</button>
              <button style={{ ...styles.actionBtn, backgroundColor: '#475569' }} onClick={() => setShowNotifModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>PlacementPro</h2>
        <nav style={styles.nav}>
          {['Overview', 'Users', 'Drives', 'Analytics'].map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.navItem, backgroundColor: activeTab === tab ? '#334155' : 'transparent' }}>{tab}</div>
          ))}
        </nav>
        <button onClick={() => navigate('/login')} style={styles.logoutBtn}>Logout</button>
      </div>
      <div style={styles.mainContent}>{renderContent()}</div>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' },
  sidebar: { width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' },
  logo: { color: '#38bdf8', padding: '25px', fontSize: '22px', fontWeight: 'bold', borderBottom: '1px solid #334155' },
  nav: { flex: 1, paddingTop: '10px' },
  navItem: { padding: '15px 25px', cursor: 'pointer', transition: '0.3s' },
  mainContent: { flex: 1, padding: '40px', overflowY: 'auto' },
  tabTitle: { color: '#38bdf8', marginBottom: '30px', fontSize: '28px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' },
  section: { backgroundColor: '#1e293b', padding: '35px', borderRadius: '20px', border: '1px solid #334155' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' },
  dashboardBtn: { padding: '18px', backgroundColor: '#38bdf8', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', color: '#0f172a' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { textAlign: 'left', color: '#38bdf8', borderBottom: '2px solid #334155', paddingBottom: '15px' },
  tableRow: { borderBottom: '1px solid #334155', height: '60px' },
  actionBtn: { padding: '12px 24px', backgroundColor: '#38bdf8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#0f172a' },
  logoutBtn: { margin: '20px', padding: '12px', backgroundColor: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '20px', width: '450px', border: '1px solid #38bdf8' },
  textarea: { width: '100%', height: '120px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155', borderRadius: '10px', padding: '15px', resize: 'none' },
  driveForm: { backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #334155' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  input: { padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white' },
  analyticsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  chartCard: { backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px', border: '1px solid #334155', height: '280px' },
  chartTitle: { margin: '0 0 15px 0', fontSize: '16px', color: '#38bdf8' },
  barContainer: { display: 'flex', alignItems: 'flex-end', gap: '15px', height: '150px', width: '100%', padding: '10px' },
  bar: { width: '40px', borderRadius: '5px 5px 0 0', position: 'relative' },
  barLabel: { position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#94a3b8' },
  donutPlaceholder: { width: '100px', height: '100px', borderRadius: '50%', border: '8px solid #38bdf8', display: 'flex', justifyContent: 'center', alignItems: 'center' }
};