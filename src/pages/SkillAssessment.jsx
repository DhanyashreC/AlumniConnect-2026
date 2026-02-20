import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SkillAssessmentHub() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState(null);
  const [activeApti, setActiveApti] = useState(null);

  // 12 Professional Coding Languages
  const languages = [
    { name: "Python", practice: "https://leetcode.com/problemset/all/?search=python", learn: "https://www.youtube.com/results?search_query=python+full+course" },
    { name: "Java", practice: "https://leetcode.com/problemset/all/?search=java", learn: "https://www.youtube.com/results?search_query=java+programming+full+course" },
    { name: "C++", practice: "https://leetcode.com/problemset/all/?search=cpp", learn: "https://www.youtube.com/results?search_query=c%2B%2B+full+course" },
    { name: "JavaScript", practice: "https://leetcode.com/problemset/all/?search=javascript", learn: "https://www.youtube.com/results?search_query=javascript+full+course" },
    { name: "C", practice: "https://leetcode.com/problemset/all/?search=c", learn: "https://www.youtube.com/results?search_query=c+programming+full+course" },
    { name: "C#", practice: "https://leetcode.com/problemset/all/?search=csharp", learn: "https://www.youtube.com/results?search_query=csharp+full+course" },
    { name: "SQL", practice: "https://leetcode.com/problemset/database/", learn: "https://www.youtube.com/results?search_query=sql+full+course" },
    { name: "PHP", practice: "https://leetcode.com/problemset/all/?search=php", learn: "https://www.youtube.com/results?search_query=php+full+course" },
    { name: "Go (Golang)", practice: "https://leetcode.com/problemset/all/?search=go", learn: "https://www.youtube.com/results?search_query=golang+full+course" },
    { name: "Swift", practice: "https://leetcode.com/problemset/all/?search=swift", learn: "https://www.youtube.com/results?search_query=swift+ios+full+course" },
    { name: "Ruby", practice: "https://leetcode.com/problemset/all/?search=ruby", learn: "https://www.youtube.com/results?search_query=ruby+programming+full+course" },
    { name: "TypeScript", practice: "https://leetcode.com/problemset/all/?search=typescript", learn: "https://www.youtube.com/results?search_query=typescript+full+course" }
  ];

  // 11 Essential Aptitude & Placement Concepts
  const aptitudeConcepts = [
    { name: "Arithmetic: Time & Distance", quiz: "https://www.indiabix.com/aptitude/time-and-distance/", learn: "https://www.youtube.com/results?search_query=time+speed+distance+aptitude" },
    { name: "Arithmetic: Profit & Loss", quiz: "https://www.indiabix.com/aptitude/profit-and-loss/", learn: "https://www.youtube.com/results?search_query=profit+and+loss+aptitude" },
    { name: "Arithmetic: Time & Work", quiz: "https://www.indiabix.com/aptitude/time-and-work/", learn: "https://www.youtube.com/results?search_query=time+and+work+aptitude" },
    { name: "Modern Math: Probability", quiz: "https://www.indiabix.com/aptitude/probability/", learn: "https://www.youtube.com/results?search_query=probability+aptitude+tricks" },
    { name: "Modern Math: P & C", quiz: "https://www.indiabix.com/aptitude/permutation-and-combination/", learn: "https://www.youtube.com/results?search_query=permutation+and+combination+aptitude" },
    { name: "Logical: Blood Relations", quiz: "https://www.indiabix.com/logical-reasoning/blood-relation-test/", learn: "https://www.youtube.com/results?search_query=blood+relations+reasoning" },
    { name: "Logical: Syllogism", quiz: "https://www.indiabix.com/logical-reasoning/syllogism/", learn: "https://www.youtube.com/results?search_query=syllogism+reasoning+tricks" },
    { name: "Logical: Seating Arrangement", quiz: "https://www.indiabix.com/logical-reasoning/seating-arrangement/", learn: "https://www.youtube.com/results?search_query=seating+arrangement+reasoning" },
    { name: "Verbal: Error Correction", quiz: "https://www.indiabix.com/verbal-ability/spotting-errors/", learn: "https://www.youtube.com/results?search_query=spotting+errors+english+grammar" },
    { name: "Verbal: Antonyms/Synonyms", quiz: "https://www.indiabix.com/verbal-ability/antonyms/", learn: "https://www.youtube.com/results?search_query=vocabulary+for+placements" },
    { name: "Data Interpretation", quiz: "https://www.indiabix.com/data-interpretation/questions-and-answers/", learn: "https://www.youtube.com/results?search_query=data+interpretation+tricks" }
  ];

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/student')} style={styles.backBtn}>← Back to Dashboard</button>
      <h1 style={styles.title}>Skill Assessment Hub</h1>

      <div style={styles.grid}>
        {/* Coding Section */}
        <div style={styles.card}>
          <div style={styles.icon}>💻</div>
          <h2 style={styles.cardTitle}>Coding Practice (12)</h2>
          <div style={styles.scrollContainer}>
            {languages.map((lang) => (
              <div key={lang.name} style={{ position: 'relative', marginBottom: '8px' }}>
                <button onClick={() => setActiveLang(activeLang === lang.name ? null : lang.name)} style={styles.actionBtn}>
                  {lang.name} {activeLang === lang.name ? '▲' : '▼'}
                </button>
                {activeLang === lang.name && (
                  <div style={styles.dropdown}>
                    <a href={lang.practice} target="_blank" rel="noreferrer" style={styles.dropItem}>🚀 Practice on LeetCode</a>
                    <a href={lang.learn} target="_blank" rel="noreferrer" style={styles.dropItem}>📖 Learn on YouTube</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Aptitude Section */}
        <div style={styles.card}>
          <div style={styles.icon}>🧠</div>
          <h2 style={styles.cardTitle}>Placement Aptitude (11)</h2>
          <div style={styles.scrollContainer}>
            {aptitudeConcepts.map((apti) => (
              <div key={apti.name} style={{ position: 'relative', marginBottom: '8px' }}>
                <button onClick={() => setActiveApti(activeApti === apti.name ? null : apti.name)} style={styles.aptiBtn}>
                  {apti.name} {activeApti === apti.name ? '▲' : '▼'}
                </button>
                {activeApti === apti.name && (
                  <div style={styles.dropdown}>
                    <a href={apti.quiz} target="_blank" rel="noreferrer" style={styles.dropItem}>📝 Take IndiaBIX Quiz</a>
                    <a href={apti.learn} target="_blank" rel="noreferrer" style={styles.dropItem}>🎥 Video Tutorial</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exam Section */}
        <div style={styles.card}>
          <div style={styles.icon}>🏆</div>
          <h2 style={styles.cardTitle}>Exam Simulation</h2>
          <p style={styles.cardSubtitle}>Real-world prep for top tier firms.</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <a href="https://www.indiabix.com/online-test/categories/" target="_blank" rel="noreferrer" style={styles.fullTestBtn}>
               🔥 Full Mock Tests
            </a>
            <a href="https://www.geeksforgeeks.org/placements-gfg/" target="_blank" rel="noreferrer" style={styles.companyBtn}>
               🏢 Company Papers (TCS/Infosys)
            </a>
            <button style={styles.startBtn} onClick={() => navigate('/mock-interview')}>
               🎙️ Start AI Mock Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' },
  backBtn: { color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' },
  title: { color: '#38bdf8', fontSize: '32px', marginBottom: '40px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' },
  card: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', height: '550px' },
  scrollContainer: { overflowY: 'auto', flex: 1, paddingRight: '8px' },
  icon: { fontSize: '40px', marginBottom: '15px' },
  cardTitle: { color: '#38bdf8', margin: '0 0 15px 0', fontSize: '20px' },
  cardSubtitle: { color: '#94a3b8', fontSize: '13px', marginBottom: '20px' },
  actionBtn: { backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between' },
  aptiBtn: { backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between' },
  dropdown: { backgroundColor: '#0f172a', borderRadius: '8px', marginTop: '4px', border: '1px solid #475569', overflow: 'hidden' },
  dropItem: { display: 'block', padding: '10px 15px', color: 'white', textDecoration: 'none', fontSize: '12px', borderBottom: '1px solid #334155' },
  fullTestBtn: { backgroundColor: '#f59e0b', color: '#0f172a', padding: '15px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' },
  companyBtn: { border: '1px solid #10b981', color: '#10b981', padding: '15px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' },
  startBtn: { backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};