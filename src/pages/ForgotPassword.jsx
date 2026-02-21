import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // This is needed to change pages

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Check if the user exists in your local storage
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (email === "admin@gmail.com" || (savedUser && savedUser.email === email)) {
      // 2. Instead of waiting for an email that won't come to localhost, 
      // we navigate directly to the reset page you just added to your routes.
      alert("Email verified! Redirecting to password reset screen...");
      navigate('/reset-password'); 
    } else {
      alert("Email not found. Please check the spelling or register.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>Enter your email to receive a reset link</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            style={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit" style={styles.button}>Send Reset Link</button>
        </form>

        <div style={styles.footer}>
          <Link to="/login" style={styles.link}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '380px', textAlign: 'center', border: '1px solid #334155' },
  title: { color: '#38bdf8', fontSize: '26px', marginBottom: '10px' },
  subtitle: { color: '#94a3b8', fontSize: '14px', marginBottom: '25px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  footer: { marginTop: '20px' },
  link: { color: '#38bdf8', textDecoration: 'none', fontSize: '14px' }
};