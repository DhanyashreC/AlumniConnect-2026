import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Network() {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null); 
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState({}); // Stores messages for all users

  // Load connections and chat history from storage on mount
  useEffect(() => {
    const savedReqs = JSON.parse(localStorage.getItem("sentRequests")) || [];
    const savedChats = JSON.parse(localStorage.getItem("chatHistory")) || {};
    setConnections(savedReqs);
    setChatHistory(savedChats);
  }, []);

  const alumni = [
    { id: 1, name: "Arjun Mehta", role: "SDE @ Google" },
    { id: 2, name: "Priya Sharma", role: "Product Manager @ Meta" },
    { id: 3, name: "Rohan Das", role: "Data Scientist @ Amazon" },
    { id: 4, name: "Sneha Kapoor", role: "UX Designer @ Microsoft" },
  ];

  const handleConnect = (person) => {
    if (!connections.includes(person.id)) {
      const updated = [...connections, person.id];
      setConnections(updated);
      localStorage.setItem("sentRequests", JSON.stringify(updated));

      // Push notification to Dashboard
      const notifs = JSON.parse(localStorage.getItem("notifications")) || [];
      localStorage.setItem("notifications", JSON.stringify([{
        id: Date.now(),
        text: `Request sent to ${person.name}`,
        time: "Just now"
      }, ...notifs]));
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update history for this specific alumni
    const updatedHistory = {
      ...chatHistory,
      [activeChat.id]: [...(chatHistory[activeChat.id] || []), newMessage]
    };

    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/student')} style={styles.backBtn}>← Back</button>
        <h1 style={styles.title}>Alumni Network</h1>
      </div>

      <div style={styles.grid}>
        {alumni.map((person) => (
          <div key={person.id} style={styles.card}>
            <div style={styles.avatar}>{person.name[0]}</div>
            <h3 style={styles.name}>{person.name}</h3>
            <p style={styles.role}>{person.role}</p>
            <div style={styles.actionGroup}>
              <button 
                onClick={() => handleConnect(person)} 
                style={connections.includes(person.id) ? styles.connectedBtn : styles.connectBtn}
              >
                {connections.includes(person.id) ? "Pending" : "Connect"}
              </button>
              <button style={styles.msgBtn} onClick={() => setActiveChat(person)}>Message</button>
            </div>
          </div>
        ))}
      </div>

      {/* --- REAL-TIME PERSISTENT CHAT BOX --- */}
      {activeChat && (
        <div style={styles.chatBox}>
          <div style={styles.chatHeader}>
            <span>{activeChat.name}</span>
            <button onClick={() => setActiveChat(null)} style={styles.closeChat}>×</button>
          </div>
          
          <div style={styles.chatBody}>
            <p style={styles.chatHint}>You are messaging {activeChat.name}</p>
            {(chatHistory[activeChat.id] || []).map((msg) => (
              <div key={msg.id} style={msg.sender === "me" ? styles.myMsgRow : styles.theirMsgRow}>
                <div style={msg.sender === "me" ? styles.myMsgBubble : styles.theirMsgBubble}>
                  {msg.text}
                  <div style={styles.msgTime}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.chatInputArea}>
            <textarea 
              placeholder="Write a message..." 
              style={styles.chatInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            />
            <button style={styles.sendBtn} onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' },
  header: { marginBottom: '40px' },
  backBtn: { background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', marginBottom: '10px' },
  title: { color: '#38bdf8', fontSize: '28px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#1e293b', padding: '25px', borderRadius: '15px', border: '1px solid #334155', textAlign: 'center' },
  avatar: { width: '60px', height: '60px', backgroundColor: '#38bdf8', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' },
  name: { fontSize: '18px', marginBottom: '5px' },
  role: { color: '#94a3b8', fontSize: '14px', marginBottom: '20px' },
  actionGroup: { display: 'flex', gap: '10px' },
  connectBtn: { flex: 1, backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  connectedBtn: { flex: 1, backgroundColor: '#334155', color: '#94a3b8', border: 'none', padding: '10px', borderRadius: '8px' },
  msgBtn: { flex: 1, backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', padding: '10px', borderRadius: '8px', cursor: 'pointer' },

  /* Persistent Chat UI Styles */
  chatBox: { position: 'fixed', bottom: '0', right: '40px', width: '320px', backgroundColor: '#1e293b', borderRadius: '12px 12px 0 0', border: '1px solid #334155', display: 'flex', flexDirection: 'column', zIndex: 1000, boxShadow: '0 -4px 15px rgba(0,0,0,0.6)' },
  chatHeader: { padding: '12px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#334155', borderRadius: '12px 12px 0 0', fontWeight: 'bold' },
  closeChat: { background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' },
  chatBody: { height: '250px', padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  chatHint: { fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginBottom: '10px' },
  myMsgRow: { display: 'flex', justifyContent: 'flex-end' },
  myMsgBubble: { backgroundColor: '#38bdf8', color: '#0f172a', padding: '8px 12px', borderRadius: '12px 12px 0 12px', maxWidth: '80%', fontSize: '13px', position: 'relative' },
  theirMsgRow: { display: 'flex', justifyContent: 'flex-start' },
  theirMsgBubble: { backgroundColor: '#334155', color: 'white', padding: '8px 12px', borderRadius: '12px 12px 12px 0', maxWidth: '80%', fontSize: '13px' },
  msgTime: { fontSize: '9px', marginTop: '4px', opacity: 0.7, textAlign: 'right' },
  chatInputArea: { padding: '12px', borderTop: '1px solid #334155', display: 'flex', gap: '8px' },
  chatInput: { flex: 1, backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', padding: '8px', resize: 'none', outline: 'none', fontSize: '12px', height: '40px' },
  sendBtn: { backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '0 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};