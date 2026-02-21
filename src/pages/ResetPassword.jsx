import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (savedUser) {
      savedUser.password = newPassword;
      localStorage.setItem("registeredUser", JSON.stringify(savedUser));
      alert("Password updated successfully! Please login with your new password.");
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create New Password</h2>
        <form onSubmit={handleUpdatePassword}>
          <input 
            type="password" 
            placeholder="New Password" 
            style={styles.input} 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            style={styles.input} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          <button type="submit" style={styles.button}>Update Password</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '380px', textAlign: 'center', border: '1px solid #334155' },
  title: { color: '#38bdf8', marginBottom: '20px', fontSize: '24px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};