import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ role: "student", name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = () => {
    // 1. Validation check
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    // --- FIX: ARRAY LOGIC STARTS HERE ---
    
    // 2. Get the current list of users from localStorage (or empty array if first time)
    const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    // 3. Check if user already exists
    const userExists = existingUsers.some(user => user.email === form.email);
    if (userExists) {
      alert("A user with this email already exists!");
      return;
    }

    // 4. Create the new user object with extra metadata for analytics
    const newUser = {
      ...form,
      id: Date.now(), // Unique ID based on time
      joinedDate: new Date().toLocaleDateString(),
      dept: form.role === 'student' ? 'Engineering' : 'N/A' // Default dept for list view
    };

    // 5. Add new user to the existing array
    const updatedUsers = [...existingUsers, newUser];

    // 6. Save the WHOLE array back to "allUsers"
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    
    // Keep these for your login session/navbar logic
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    localStorage.setItem("userName", form.name);
    
    // --- ARRAY LOGIC ENDS ---

    console.log("Updated User Directory:", updatedUsers);
    alert("Registration Successful! Please login.");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Join PlacementPro</h2>
          <p style={styles.subtitle}>Create your account to get started</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input 
            style={styles.input} 
            placeholder="Enter your name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input 
            style={styles.input} 
            type="email"
            placeholder="name@college.edu"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Set Password</label>
          <input 
            style={styles.input} 
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>I am a:</label>
          <select 
            style={styles.input} 
            value={form.role}
            onChange={e => setForm({...form, role: e.target.value})}
          >
            <option value="student">Student</option>
            <option value="alumni">Alumni / Mentor</option>
          </select>
        </div>

        <button style={styles.registerBtn} onClick={handleRegister}>
          Create Account
        </button>

        <div style={styles.divider}>
          <span style={styles.line}></span>
          <span style={styles.dividerText}>or continue with</span>
          <span style={styles.line}></span>
        </div>

        <div style={styles.socialGroup}>
          <button style={styles.socialBtn} onClick={() => alert("Google Sign-in coming soon!")}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" width="18" alt="G" /> Google
          </button>
          <button style={styles.socialBtn} onClick={() => alert("GitHub Sign-in coming soon!")}>
            <img src="https://www.svgrepo.com/show/350411/github.svg" width="18" alt="GH" /> GitHub
          </button>
        </div>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' },
  registerCard: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '450px', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { color: '#38bdf8', fontSize: '28px', marginBottom: '8px' },
  subtitle: { color: '#94a3b8', fontSize: '14px' },
  formGroup: { marginBottom: '18px' },
  label: { display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: '500' },
  input: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none', boxSizing: 'border-box' },
  registerBtn: { width: '100%', backgroundColor: '#38bdf8', color: '#0f172a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', transition: '0.2s' },
  divider: { display: 'flex', alignItems: 'center', margin: '25px 0', gap: '10px' },
  line: { flex: 1, height: '1px', backgroundColor: '#334155' },
  dividerText: { color: '#64748b', fontSize: '12px', textTransform: 'uppercase' },
  socialGroup: { display: 'flex', gap: '15px', marginBottom: '25px' },
  socialBtn: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: 'transparent', border: '1px solid #334155', color: '#f8fafc', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' },
  footerText: { textAlign: 'center', color: '#94a3b8', fontSize: '14px' },
  link: { color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }
};