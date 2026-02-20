import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Internships() {
  const navigate = useNavigate();
  
  // Generating 45 random internships
  const list = Array.from({ length: 45 }, (_, i) => ({
    id: `int-${i + 1}`, // Added 'int-' prefix to make IDs unique from jobs
    title: ["Web Dev", "Marketing", "AI Research", "Design"][i % 4],
    company: ["Tesla", "Adobe", "Zomato", "Spotify"][i % 4],
    stipend: "₹20,000/mo",
    duration: "3 Months"
  }));

  // --- NEW APPLY LOGIC ---
  const handleApply = (item) => {
    // 1. Get existing applications from the key "myApplications"
    const existingApps = JSON.parse(localStorage.getItem("myApplications")) || [];

    // 2. Check if already applied
    const alreadyApplied = existingApps.some(app => app.id === item.id);
    
    if (alreadyApplied) {
      alert("You have already applied for this internship!");
      return;
    }

    // 3. Create new application object (Notice the status is "Pending")
    const newApplication = {
      id: item.id,
      role: `${item.title} Intern`,
      company: item.company,
      appliedDate: new Date().toLocaleDateString(),
      status: "Pending" 
    };

    // 4. Save and Redirect
    localStorage.setItem("myApplications", JSON.stringify([newApplication, ...existingApps]));
    
    alert(`Applied to ${item.company} successfully!`);
    navigate("/applications"); // Navigates to your applications page
  };

  return (
    <div style={{backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif'}}>
      <button onClick={() => navigate('/student')} style={{color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer'}}>← Back to Dashboard</button>
      
      <h1 style={{color: '#38bdf8', margin: '20px 0'}}>Internship Opportunities ({list.length})</h1>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {list.map(item => (
          <div key={item.id} style={{backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155'}}>
            <div>
              <h3 style={{margin: 0}}>{item.title} Intern</h3>
              <p style={{color: '#94a3b8', margin: '5px 0'}}>{item.company} • {item.duration}</p>
              <span style={{color: '#10b981', fontSize: '12px'}}>{item.stipend}</span>
            </div>
            
            {/* Added onClick handler here */}
            <button 
              onClick={() => handleApply(item)}
              style={{
                backgroundColor: '#38bdf8', 
                color: '#0f172a',
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}