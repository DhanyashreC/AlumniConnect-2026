import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. HARDCODED ADMIN CHECK 
    // This allows you to log in as Admin without needing to register first
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userName", "Administrator");
      alert("Admin Login Successful!");
      navigate('/admin'); // Matches your AppRoutes.jsx path
      return; 
    }

    // 2. RETRIEVE REGISTERED USER (For Alumni/Students like Dhanya)
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    // 3. VERIFICATION LOGIC
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      // Store session details
      localStorage.setItem("userName", savedUser.name);
      localStorage.setItem("userRole", savedUser.role);
      
      // 4. ROLE-BASED REDIRECTION
      if (savedUser.role === 'alumni') {
        alert(`Welcome back, ${savedUser.name}! Opening Alumni Portal...`);
        navigate('/alumni'); 
      } else if (savedUser.role === 'student') {
        alert("Redirecting to Student Dashboard...");
        navigate('/student'); 
      } else {
        // Fallback for other roles saved in localStorage
        navigate('/admin');
      }
    } else {
      alert("Invalid email or password. Please check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
           <h2 style={styles.title}>Member Login</h2>
           <p style={styles.subtitle}>PlacementPro Ecosystem | Solve-a-thon 1.0</p>
        </div>

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email Address" 
            style={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          <div style={styles.extraActions}>
            {/* Updated span to Link to navigate to the new forgot-password route */}
            <Link to="/forgot-password" style={styles.forgotPass}>Forgot Password?</Link>
          </div>

          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register Now</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '380px', textAlign: 'center', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.4)' },
  header: { marginBottom: '25px' },
  title: { color: '#38bdf8', marginBottom: '8px', fontSize: '26px' },
  subtitle: { color: '#94a3b8', fontSize: '13px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none', boxSizing: 'border-box' },
  extraActions: { textAlign: 'right', marginBottom: '20px' },
  // Kept style exactly the same, just ensured text-decoration is none for the Link component
  forgotPass: { color: '#38bdf8', fontSize: '13px', cursor: 'pointer', fontWeight: '500', textDecoration: 'none' },
  button: { width: '100%', padding: '14px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  footerText: { color: '#94a3b8', marginTop: '25px', fontSize: '14px' },
  link: { color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }
};