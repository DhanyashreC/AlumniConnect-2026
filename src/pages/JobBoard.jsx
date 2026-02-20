import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobBoard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Generating the list of 90 job roles
  const companies = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "TCS", "Infosys", "Wipro", "Tesla"];
  const roles = ["Software Engineer", "Data Scientist", "Frontend Dev", "Backend Dev", "UI/UX Designer", "Product Manager", "QA Engineer", "DevOps Specialist", "Cybersecurity Analyst"];
  const locations = ["Remote", "Bangalore", "Hyderabad", "Pune", "Noida", "Mumbai", "Chennai", "San Francisco"];

  const allJobs = Array.from({ length: 90 }, (_, i) => ({
    id: i + 1,
    company: companies[i % companies.length],
    role: roles[i % roles.length],
    location: locations[i % locations.length],
    package: `${Math.floor(Math.random() * (45 - 5) + 5)} LPA`,
    deadline: `${Math.floor(Math.random() * 10 + 1)} days left`
  }));

  const filteredJobs = allJobs.filter(job => 
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * This function handles the "Apply Now" click.
   * It navigates to the form and passes the specific job data
   * so the application can be tracked correctly.
   */
  const handleApplyClick = (job) => {
    navigate('/apply', { state: { job } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          onClick={() => navigate('/student')} 
          style={styles.backLink}
        >
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>Active Placement Drives 💼</h1>
        <p style={styles.subtitle}>{allJobs.length} Opportunities Found</p>
        
        <input 
          type="text" 
          placeholder="Search by role or company..." 
          style={styles.searchBar}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.scrollArea}>
        <div style={styles.list}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} style={styles.jobCard}>
                <div style={styles.info}>
                  <h3 style={styles.companyName}>{job.company}</h3>
                  <p style={styles.roleName}>{job.role} • {job.location}</p>
                  <div style={styles.details}>
                    <span style={styles.badge}>{job.package}</span>
                    <span style={styles.deadline}>⏳ {job.deadline}</span>
                  </div>
                </div>
                <button 
                  style={styles.applyBtn} 
                  onClick={() => handleApplyClick(job)}
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#94a3b8', textAlign: 'center' }}>No jobs found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    backgroundColor: '#0f172a', 
    height: '100vh', 
    padding: '40px', 
    color: 'white', 
    fontFamily: 'sans-serif', 
    display: 'flex', 
    flexDirection: 'column' 
  },
  header: { marginBottom: '20px' },
  backLink: { 
    color: '#38bdf8', 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    padding: 0, 
    marginBottom: '15px',
    fontSize: '14px'
  },
  title: { color: '#38bdf8', fontSize: '28px', marginBottom: '5px' },
  subtitle: { color: '#94a3b8', marginBottom: '20px' },
  searchBar: {
    width: '100%', 
    maxWidth: '500px', 
    padding: '12px 20px', 
    borderRadius: '8px', 
    border: '1px solid #334155', 
    backgroundColor: '#1e293b', 
    color: 'white', 
    marginBottom: '20px',
    outline: 'none'
  },
  scrollArea: { 
    overflowY: 'auto', 
    flex: 1, 
    paddingRight: '10px' 
  },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  jobCard: { 
    backgroundColor: '#1e293b', 
    padding: '20px', 
    borderRadius: '12px', 
    border: '1px solid #334155', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  companyName: { color: '#38bdf8', margin: '0 0 5px 0' },
  roleName: { color: '#cbd5e1', margin: '0 0 10px 0', fontSize: '14px' },
  details: { display: 'flex', gap: '15px', alignItems: 'center' },
  badge: { 
    border: '1px solid #10b981', 
    color: '#10b981', 
    padding: '2px 8px', 
    borderRadius: '15px', 
    fontSize: '11px' 
  },
  deadline: { color: '#f43f5e', fontSize: '11px' },
  applyBtn: { 
    backgroundColor: '#38bdf8', 
    color: '#0f172a', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '6px', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};