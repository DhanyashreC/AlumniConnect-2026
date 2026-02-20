import React, { useState, useEffect, useRef } from 'react';

export default function AlumniDashboard() {
  const [view, setView] = useState("overview");
  const fileInputRef = useRef(null);

  // --- USER DATA STATE ---
  // Initialized empty - will be populated from localStorage
  const [userData, setUserData] = useState({
    name: "", email: "", phone: "", department: "", 
    passingYear: "", cgpa: "",
    currentCompany: "", jobRole: "", 
    experience: "", skills: "", 
    linkedIn: "", github: "",
    resumeUploaded: false
  });

  // --- NEW: LOAD FROM LOCAL STORAGE ---
  useEffect(() => {
    const savedData = localStorage.getItem('loggedInUser');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Only update fields if they exist in the stored object
        setUserData(prev => ({ ...prev, ...parsedData }));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  // --- NEW: CALC DYNAMIC PROGRESS ---
  const calculateProgress = () => {
    const totalFields = Object.keys(userData).length;
    const filledFields = Object.values(userData).filter(val => val !== "" && val !== false).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  // --- FORM STATES ---
  const [newJob, setNewJob] = useState({ company: "", role: "", exp: "", salary: "", location: "", link: "" });
  const [newIntern, setNewIntern] = useState({ company: "", role: "", duration: "", stipend: "", mode: "Remote", skills: "", link: "" });
  
  // --- FILTER STATES ---
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRole, setFilterRole] = useState(""); 
  const [filterPkgRange, setFilterPkgRange] = useState("all");
  const [filterMinCGPA, setFilterMinCGPA] = useState(0); 

  // --- DATA ---
  const [driveData] = useState([
    { id: 1, company: "Google", role: "SDE", location: "Bangalore", package: 32, eligibility: 8.5, deadline: "2026-03-15" },
    { id: 2, company: "Microsoft", role: "Analyst", location: "Hyderabad", package: 28, eligibility: 8.0, deadline: "2026-03-10" },
    { id: 3, company: "Amazon", role: "SDE", location: "Pune", package: 22, eligibility: 7.5, deadline: "2026-03-20" },
    { id: 4, company: "TCS", role: "System Engineer", location: "Mumbai", package: 7, eligibility: 6.0, deadline: "2026-03-25" }
  ]);

  const [myApps, setMyApps] = useState([
    { id: 101, company: "Google", role: "SDE", status: "Shortlisted" },
    { id: 102, company: "Zomato", role: "Product Designer", status: "Applied" }
  ]);

  const [internships, setInternships] = useState([
    { id: 1, company: "Google", role: "UI/UX Intern", duration: "6 Months", stipend: "45k/mo", mode: "Remote", skills: "Figma, React", link: "https://google.com/careers" },
    { id: 2, company: "Meta", role: "Backend Intern", duration: "3 Months", stipend: "60k/mo", mode: "Onsite", skills: "Python, Go", link: "https://meta.com/careers" }
  ]);

  const [alumniJobs, setAlumniJobs] = useState([
    { id: 501, company: "Uber", role: "Backend Engineer", exp: "2-4 Yrs", location: "Bangalore", salary: "24 LPA", link: "https://www.uber.com/careers" }
  ]);

  const activities = [
    { id: 1, text: "Shared a new SDE job opening at TCS", time: "2h ago" },
    { id: 2, text: "Awarded 'Top Mentor' for Feb 2026", time: "1d ago" }
  ];

  // --- HANDLERS ---
  const handleSaveProfile = () => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    alert("Profile saved successfully to storage!");
  };

  const handleApplyDrive = (drive) => {
    if (myApps.some(app => app.company === drive.company && app.role === drive.role)) return;
    const newApp = { id: Date.now(), company: drive.company, role: drive.role, status: "Applied" };
    setMyApps([newApp, ...myApps]);
    alert(`Successfully applied to ${drive.company}!`);
  };

  const handlePostJob = () => {
    if (!newJob.company || !newJob.role) { alert("Fill Company and Role!"); return; }
    setAlumniJobs([{ id: Date.now(), ...newJob }, ...alumniJobs]);
    setNewJob({ company: "", role: "", exp: "", salary: "", location: "", link: "" });
    alert("Job Posted!");
  };

  const handlePostInternship = () => {
    if (!newIntern.company || !newIntern.role) { alert("Fill Company and Role!"); return; }
    setInternships([{ id: Date.now(), ...newIntern }, ...internships]);
    setNewIntern({ company: "", role: "", duration: "", stipend: "", mode: "Remote", skills: "", link: "" });
    alert("Internship Posted!");
  };

  const handleApply = (link) => {
    if (link && link !== "#") window.open(link, "_blank");
    else alert("Link not found.");
  };

  const filterByPackage = (pkg) => {
    if (filterPkgRange === "all") return true;
    if (filterPkgRange === "21-30") return pkg > 20 && pkg <= 30;
    if (filterPkgRange === "31+") return pkg > 30;
    return true;
  };

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logoText}>PlacementPro</h2>
        <div style={styles.menuSection}>
          <p style={styles.menuLabel}>ADMIN & CORE</p>
          <div style={view === "overview" ? styles.activeLink : styles.link} onClick={() => setView("overview")}>📊 Dashboard</div>
          <div style={view === "drives" ? styles.activeLink : styles.link} onClick={() => setView("drives")}>📅 Placement Drives</div>
          <div style={view === "analytics" ? styles.activeLink : styles.link} onClick={() => setView("analytics")}>📈 Analytics</div>
          <p style={styles.menuLabel}>OPPORTUNITIES</p>
          <div style={view === "jobboard" ? styles.activeLink : styles.link} onClick={() => setView("jobboard")}>💼 Job Board</div>
          <div style={view === "internships" ? styles.activeLink : styles.link} onClick={() => setView("internships")}>🚀 Internships</div>
          <p style={styles.menuLabel}>SETTINGS</p>
          <div style={view === "profile" ? styles.activeLink : styles.link} onClick={() => setView("profile")}>👤 Update Profile</div>
          <div style={styles.logoutLink} onClick={() => {
            localStorage.removeItem('loggedInUser');
            window.location.href = "/login";
          }}>🚪 Logout</div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <header style={styles.header}>
          <h2 style={styles.welcome}>Welcome Back, {userData.name || "User"}</h2>
          <div style={styles.badge}>🔔 {myApps.length} Active Apps</div>
        </header>

        {/* OVERVIEW */}
        {view === "overview" && (
          <div style={styles.viewContainer}>
            <div style={styles.card}>
              <h3>Profile Status</h3>
              <div style={styles.progressBg}>
                <div style={{...styles.progressFill, width: `${calculateProgress()}%`}}></div>
              </div>
              <p style={styles.subText}>{calculateProgress()}% Complete - {calculateProgress() === 100 ? "Looking sharp!" : "Fill more info to reach 100%"}</p>
            </div>
            <div style={styles.dashboardGrid}>
              <div style={styles.mainCol}>
                <h3 style={styles.sectionTitle}>Overview</h3>
                <div style={styles.grid}>
                  <div style={styles.jobCard}><h4>Total Drives</h4><p style={styles.salary}>{driveData.length}</p></div>
                  <div style={styles.jobCard}><h4>My Apps</h4><p style={styles.salary}>{myApps.length}</p></div>
                </div>
              </div>
              <div style={styles.sideCol}>
                <h3 style={styles.sectionTitle}>Activity</h3>
                <div style={styles.activityList}>{activities.map(a => (<div key={a.id} style={styles.activityItem}><p>{a.text}</p></div>))}</div>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {view === "analytics" && (
          <div style={styles.viewContainer}>
            <h3 style={{...styles.sectionTitle, color: '#38bdf8'}}>📈 Performance Insights</h3>
            <div style={styles.analyticsGrid}>
              <div style={styles.statBox}>
                  <p style={styles.menuLabel}>TOTAL APPLICATIONS</p>
                  <h2 style={{fontSize: '32px', margin: '10px 0'}}>{myApps.length}</h2>
                  <p style={{color: '#10b981', fontSize: '12px'}}>↑ 12% from last month</p>
              </div>
              <div style={styles.statBox}>
                  <p style={styles.menuLabel}>INTERVIEW INVITES</p>
                  <h2 style={{fontSize: '32px', margin: '10px 0'}}>4</h2>
                  <p style={{color: '#38bdf8', fontSize: '12px'}}>Across 3 Companies</p>
              </div>
              <div style={styles.statBox}>
                  <p style={styles.menuLabel}>AVERAGE PACKAGE</p>
                  <h2 style={{fontSize: '32px', margin: '10px 0'}}>18.5 <span style={{fontSize: '14px'}}>LPA</span></h2>
                  <p style={{color: '#94a3b8', fontSize: '12px'}}>Based on applied drives</p>
              </div>
              <div style={styles.statBox}>
                  <p style={styles.menuLabel}>PROFILE VIEWS</p>
                  <h2 style={{fontSize: '32px', margin: '10px 0'}}>128</h2>
                  <p style={{color: '#fbbf24', fontSize: '12px'}}>New recruiters this week</p>
              </div>
            </div>
            
            <div style={{...styles.card, marginTop: '30px', textAlign: 'center', padding: '60px'}}>
              <p style={{color: '#64748b'}}>Visual Analytics Chart Placeholder</p>
              <h4 style={{color: '#cbd5e1'}}>Application Success Rate: 65%</h4>
              <div style={{...styles.progressBg, maxWidth: '400px', margin: '20px auto'}}>
                  <div style={{...styles.progressFill, width: '65%', backgroundColor: '#38bdf8'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* PLACEMENT DRIVES */}
        {view === "drives" && (
          <div style={styles.viewContainer}>
            <div style={styles.filterBarGrid}>
              <input type="text" placeholder="Company" style={styles.filterInput} onChange={(e) => setFilterCompany(e.target.value)} />
              <input type="text" placeholder="Role" style={styles.filterInput} onChange={(e) => setFilterRole(e.target.value)} />
              <select style={styles.filterInput} onChange={(e) => setFilterPkgRange(e.target.value)}>
                <option value="all">All Packages</option>
                <option value="21-30">21-30 LPA</option>
                <option value="31+">31+ LPA</option>
              </select>
              <select style={styles.filterInput} onChange={(e) => setFilterMinCGPA(parseFloat(e.target.value))}>
                <option value="0">All CGPA</option>
                <option value="8.5">8.5+</option>
                <option value="7.5">7.5+</option>
              </select>
            </div>
            <div style={styles.dashboardGrid}>
              <div style={styles.mainCol}>
                <div style={styles.grid}>
                  {driveData.filter(d => 
                    d.company.toLowerCase().includes(filterCompany.toLowerCase()) && 
                    d.role.toLowerCase().includes(filterRole.toLowerCase()) &&
                    filterByPackage(d.package) && d.eligibility >= filterMinCGPA
                  ).map(d => (
                    <div key={d.id} style={styles.jobCard}>
                      <div>
                        <h4 style={{color: '#38bdf8'}}>{d.company}</h4>
                        <p style={styles.salary}>{d.package} LPA</p>
                        <p style={styles.driveText}>{d.role}</p>
                      </div>
                      <button 
                        style={{
                          ...styles.viewBtn, 
                          backgroundColor: myApps.some(app => app.company === d.company) ? '#1e293b' : 'transparent',
                          color: myApps.some(app => app.company === d.company) ? '#64748b' : '#38bdf8'
                        }} 
                        onClick={() => handleApplyDrive(d)}
                        disabled={myApps.some(app => app.company === d.company)}
                      >
                        {myApps.some(app => app.company === d.company) ? "Applied" : "Apply Now"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* JOB BOARD */}
        {view === "jobboard" && (
          <div style={styles.viewContainer}>
            <div style={styles.card}>
              <h3 style={{color: '#38bdf8', marginBottom: '20px'}}>🚀 Post a New Job</h3>
              <div style={styles.formGrid}>
                <input type="text" placeholder="Company" style={styles.filterInput} value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} />
                <input type="text" placeholder="Role" style={styles.filterInput} value={newJob.role} onChange={(e) => setNewJob({...newJob, role: e.target.value})} />
                <input type="text" placeholder="Experience" style={styles.filterInput} value={newJob.exp} onChange={(e) => setNewJob({...newJob, exp: e.target.value})} />
                <input type="text" placeholder="Salary" style={styles.filterInput} value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})} />
                <input type="text" placeholder="Location" style={styles.filterInput} value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} />
                <input type="text" placeholder="Apply Link" style={styles.filterInput} value={newJob.link} onChange={(e) => setNewJob({...newJob, link: e.target.value})} />
              </div>
              <button style={{...styles.viewBtn, backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', width: 'auto', padding: '10px 30px'}} onClick={handlePostJob}>Publish Job</button>
            </div>
            <div style={styles.grid}>
              {alumniJobs.map(job => (
                <div key={job.id} style={styles.jobCard}>
                  <div>
                    <h4 style={{color: '#38bdf8'}}>{job.role}</h4>
                    <p style={styles.subText}>{job.company}</p>
                    <p style={styles.salary}>{job.salary}</p>
                  </div>
                  <button style={styles.viewBtn} onClick={() => handleApply(job.link)}>Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIPS */}
        {view === "internships" && (
          <div style={styles.viewContainer}>
            <div style={styles.card}>
              <h3 style={{color: '#fbbf24', marginBottom: '20px'}}>🎓 Post New Internship</h3>
              <div style={styles.formGrid}>
                <input type="text" placeholder="Company" style={styles.filterInput} value={newIntern.company} onChange={(e) => setNewIntern({...newIntern, company: e.target.value})} />
                <input type="text" placeholder="Role" style={styles.filterInput} value={newIntern.role} onChange={(e) => setNewIntern({...newIntern, role: e.target.value})} />
                <input type="text" placeholder="Stipend" style={styles.filterInput} value={newIntern.stipend} onChange={(e) => setNewIntern({...newIntern, stipend: e.target.value})} />
                <input type="text" placeholder="Apply Link" style={styles.filterInput} value={newIntern.link} onChange={(e) => setNewIntern({...newIntern, link: e.target.value})} />
              </div>
              <button style={{...styles.viewBtn, backgroundColor: '#fbbf24', color: '#0f172a', border: 'none', width: 'auto', padding: '10px 30px'}} onClick={handlePostInternship}>Publish Internship</button>
            </div>
            <div style={styles.grid}>
              {internships.map(intern => (
                <div key={intern.id} style={styles.jobCard}>
                  <div>
                    <h4 style={{color: '#38bdf8'}}>{intern.role}</h4>
                    <p style={styles.subText}>{intern.company}</p>
                    <p style={{...styles.salary, color: '#fbbf24'}}>{intern.stipend}</p>
                  </div>
                  <button style={styles.viewBtn} onClick={() => handleApply(intern.link)}>Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {view === "profile" && (
          <div style={styles.viewContainer}>
            <div style={styles.card}>
              <h3 style={{color: '#38bdf8', marginBottom: '20px'}}>👤 Professional Profile Settings</h3>
              
              <p style={styles.menuLabel}>BASIC INFORMATION</p>
              <div style={styles.formGrid}>
                <input type="text" placeholder="Full Name" style={styles.filterInput} value={userData.name} onChange={(e)=>setUserData({...userData, name: e.target.value})} />
                <input type="email" placeholder="Email Address" style={styles.filterInput} value={userData.email} onChange={(e)=>setUserData({...userData, email: e.target.value})} />
                <input type="text" placeholder="Department" style={styles.filterInput} value={userData.department} onChange={(e)=>setUserData({...userData, department: e.target.value})} />
                <input type="text" placeholder="Graduation Year" style={styles.filterInput} value={userData.passingYear} onChange={(e)=>setUserData({...userData, passingYear: e.target.value})} />
              </div>

              <p style={styles.menuLabel}>CURRENT PROFESSIONAL STATUS</p>
              <div style={styles.formGrid}>
                <input type="text" placeholder="Current Company" style={styles.filterInput} value={userData.currentCompany} onChange={(e)=>setUserData({...userData, currentCompany: e.target.value})} />
                <input type="text" placeholder="Job Role" style={styles.filterInput} value={userData.jobRole} onChange={(e)=>setUserData({...userData, jobRole: e.target.value})} />
                <input type="text" placeholder="Years of Experience" style={styles.filterInput} value={userData.experience} onChange={(e)=>setUserData({...userData, experience: e.target.value})} />
                <input type="text" placeholder="Key Skills" style={styles.filterInput} value={userData.skills} onChange={(e)=>setUserData({...userData, skills: e.target.value})} />
              </div>

              <p style={styles.menuLabel}>SOCIAL & PROFESSIONAL LINKS</p>
              <div style={styles.formGrid}>
                <input type="text" placeholder="LinkedIn URL" style={styles.filterInput} value={userData.linkedIn} onChange={(e)=>setUserData({...userData, linkedIn: e.target.value})} />
                <input type="text" placeholder="GitHub URL" style={styles.filterInput} value={userData.github} onChange={(e)=>setUserData({...userData, github: e.target.value})} />
              </div>

              <div style={{marginTop: '30px', display: 'flex', gap: '15px'}}>
                <button style={{...styles.viewBtn, width: 'auto', padding: '10px 20px'}} onClick={() => fileInputRef.current.click()}>
                  {userData.resumeUploaded ? "✅ Resume Attached" : "📁 Upload New Resume"}
                </button>
                <button 
                  style={{...styles.viewBtn, backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', fontWeight: 'bold', width: 'auto', padding: '10px 20px'}} 
                  onClick={handleSaveProfile}
                >
                  Save & Update Storage
                </button>
              </div>
              <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={()=>setUserData({...userData, resumeUploaded: true})} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  layout: { display: "flex", backgroundColor: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "sans-serif" },
  sidebar: { width: "240px", backgroundColor: "#1e293b", height: "100vh", padding: "20px", position: "fixed", borderRight: "1px solid #334155" },
  logoText: { color: "#38bdf8", fontSize: "22px", fontWeight: "bold", textAlign: "center", marginBottom: "30px" },
  menuLabel: { color: "#64748b", fontSize: "11px", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" },
  link: { color: "#cbd5e1", padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", display: "block" },
  activeLink: { color: "#38bdf8", backgroundColor: "#0f172a", padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold", borderLeft: "4px solid #38bdf8" },
  logoutLink: { color: "#ef4444", padding: "12px", cursor: "pointer", fontSize: "14px", marginTop: "20px" },
  mainContent: { flex: 1, marginLeft: "240px", padding: "40px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #334155", paddingBottom: "20px" },
  welcome: { margin: 0, color: "#38bdf8" },
  badge: { backgroundColor: "#1e293b", padding: "8px 12px", borderRadius: "20px", fontSize: "12px", border: "1px solid #334155" },
  dashboardGrid: { display: "flex", gap: "30px" },
  mainCol: { flex: 2 },
  sideCol: { flex: 1 },
  card: { backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "30px" },
  progressBg: { width: "100%", height: "8px", backgroundColor: "#0f172a", borderRadius: "4px", margin: "15px 0" },
  progressFill: { height: "100%", backgroundColor: "#10b981", borderRadius: "4px" },
  sectionTitle: { fontSize: "18px", marginBottom: "15px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "25px" },
  jobCard: { backgroundColor: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px" },
  salary: { color: "#10b981", fontWeight: "bold", marginTop: "8px" },
  subText: { color: "#94a3b8", fontSize: "13px" },
  viewBtn: { marginTop: "15px", width: "100%", padding: "8px", background: "none", border: "1px solid #38bdf8", color: "#38bdf8", borderRadius: "6px", cursor: "pointer" },
  activityList: { backgroundColor: "#1e293b", padding: "15px", borderRadius: "12px", border: "1px solid #334155" },
  activityItem: { marginBottom: "15px", borderBottom: '1px solid #334155', paddingBottom: '10px' },
  filterBarGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  filterInput: { width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '8px', boxSizing: 'border-box' },
  analyticsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  statBox: { backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' },
  driveText: { fontSize: '13px', margin: '8px 0', color: '#cbd5e1' },
};