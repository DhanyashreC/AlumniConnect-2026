import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  // --- LOGIC ---
  const [currentReview, setCurrentReview] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const reviews = [
    { name: "Ananya Sharma", role: "Student @ Google", text: "PlacementPro helped me track every application. The AI mock interviews were a game changer!", img: "https://i.pravatar.cc/150?u=1" },
    { name: "Rahul Verma", role: "Alumni @ Tesla", text: "I love giving back to my college. Mentoring juniors through this platform is so seamless.", img: "https://i.pravatar.cc/150?u=2" },
    { name: "Sneha Kapur", role: "Student @ Microsoft", text: "The aptitude practice papers are exactly what companies ask. Highly recommended!", img: "https://i.pravatar.cc/150?u=3" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: '', email: '', message: '' });
  };

  // --- ANIMATIONS ---
  const animations = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
      70% { box-shadow: 0 0 0 15px rgba(56, 189, 248, 0); }
      100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
    }
    .reveal { animation: fadeInUp 0.8s ease-out forwards; }
    .floating-hero { animation: float 5s ease-in-out infinite; }
    .pulse { animation: pulseGlow 2s infinite; }
    .hover-card:hover {
      background: rgba(30, 41, 59, 0.8) !important;
      border-color: #38bdf8 !important;
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
  `;

  return (
    <div style={styles.container}>
      <style>{animations}</style>

      {/* --- NAVBAR --- */}
      <nav style={styles.nav}>
        {/* LOGO NOW NAVIGATES TO HOME */}
        <div 
          style={{...styles.logo, cursor: 'pointer'}} 
          onClick={() => scrollToSection('home')}
        >
          PlacementPro <span style={{fontSize: '20px'}}>🚀</span>
        </div>

        <div style={styles.navLinks}>
          {['home', 'services', 'blog', 'about', 'contact'].map((item) => (
            <span 
              key={item} 
              onClick={() => scrollToSection(item)} 
              style={styles.navItem}
              onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
          ))}
        </div>

        <div style={styles.authLinks}>
          <Link to="/login" style={styles.navItem}>Login</Link>
          <Link to="/register" className="pulse" style={styles.primaryBtnSmall}>Register</Link>
        </div>
      </nav>

      {/* --- HERO --- */}
      <header id="home" style={styles.hero}>
        <div style={{animation: 'fadeInUp 1s ease-out'}}>
          <div style={styles.badge} className="floating-hero">Class of 2026 Exclusive</div>
          <h1 style={styles.title}>Your Career Journey, <br/>
            <span style={styles.gradientText}>Accelerated.</span>
          </h1>
          <p style={styles.subtitle}>
            The all-in-one ecosystem for students to land dream jobs and alumni to mentor the next generation.
          </p>
          <div style={styles.buttonGroup}>
            <Link to="/register" style={styles.primaryBtn}>Get Started Free</Link>
            <button onClick={() => scrollToSection('services')} style={styles.secondaryBtn}>Explore Features</button>
          </div>
        </div>
      </header>

      {/* --- SERVICES --- */}
      <section id="services" style={styles.section} className="reveal">
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.grid}>
          {[
            { icon: "💼", title: "Job Board", desc: "Access exclusive off-campus and on-campus drives." },
            { icon: "🚀", title: "Skill Assessments", desc: "Coding and AI-driven Mock Interviews." },
            { icon: "🤝", title: "Alumni Network", desc: "Connect with seniors at top Fortune 500 companies." }
          ].map((service, idx) => (
            <div key={idx} className="hover-card" style={{...styles.card, transition: '0.3s'}}>
              <div style={styles.iconContainer}>{service.icon}</div>
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SUCCESS STORIES --- */}
      <section id="blog" style={styles.blogSection} className="reveal">
        <h2 style={styles.sectionTitle}>Success Stories</h2>
        <div style={styles.carouselContainer}>
          <div style={styles.reviewCard}>
            <img src={reviews[currentReview].img} alt="User" style={styles.reviewImg} className="floating-hero" />
            <p style={styles.reviewText}>"{reviews[currentReview].text}"</p>
            <h4 style={{color: '#38bdf8', margin: '10px 0'}}>{reviews[currentReview].name}</h4>
            <small style={{color: '#94a3b8'}}>{reviews[currentReview].role}</small>
          </div>
        </div>
      </section>

      {/* --- ABOUT US --- */}
      <section id="about" style={styles.section} className="reveal">
        <div style={styles.aboutFlex}>
          <div style={{flex: 1, minWidth: '300px'}}>
            <h2 style={styles.sectionTitleLeft}>About Us</h2>
            <p style={styles.aboutText}>
              PlacementPro was founded with a single mission: To bridge the gap between academic learning and corporate expectations. We empower students through AI-driven tools and direct alumni mentorship.
            </p>
          </div>
          <div style={styles.placeholderImg} className="hover-card">
            <img src="/assets/student.png" alt="Placement Students" style={styles.fullImg} />
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" style={styles.section} className="reveal">
        <div style={styles.contactGlassCard}>
          <h2 style={styles.sectionTitleLeft}>Get In Touch</h2>
          
          <div style={styles.contactFlexRow}>
            {/* Info Side */}
            <div style={styles.contactInfoSide}>
              <div style={styles.contactImageWrap}>
                
              </div>
              <div style={styles.addressBox}>
                <p style={styles.infoItem}>📍 Tech Hub Towers, Sector 62, Bangalore</p>
                <p style={styles.infoItem}>📧 support@placementpro.com</p>
                <p style={styles.infoItem}>📞 +91 98765 43210</p>
              </div>
            </div>

            {/* Form Side */}
            <form style={styles.form} onSubmit={handleSendMessage}>
              <input type="text" placeholder="Name" style={styles.input} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <input type="email" placeholder="Email" style={styles.input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <textarea placeholder="Message" style={{...styles.input, height: '120px'}} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
              <button type="submit" style={styles.primaryBtn} className="pulse">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 PlacementPro Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}

// --- THE STYLES OBJECT ---
const styles = {
  container: { backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 80px', backgroundColor: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(255,255,255,0.05)' },
  logo: { fontSize: '24px', fontWeight: '800', color: '#fff' },
  navLinks: { display: 'flex', gap: '30px' },
  navItem: { color: '#cbd5e1', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: '0.3s', textDecoration: 'none' },
  authLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  primaryBtnSmall: { backgroundColor: '#38bdf8', color: '#020617', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' },
  hero: { padding: '150px 20px', textAlign: 'center', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)' },
  badge: { display: 'inline-block', padding: '6px 16px', borderRadius: '20px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px', border: '1px solid rgba(56, 189, 248, 0.2)' },
  title: { fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-2px' },
  gradientText: { background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { fontSize: '20px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 48px auto' },
  buttonGroup: { display: 'flex', justifyContent: 'center', gap: '20px' },
  primaryBtn: { backgroundColor: '#38bdf8', color: '#020617', padding: '16px 36px', borderRadius: '12px', fontWeight: '700', border: 'none', cursor: 'pointer' },
  secondaryBtn: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '16px 36px', borderRadius: '12px', cursor: 'pointer' },
  section: { padding: '100px 10%' },
  sectionTitle: { fontSize: '42px', fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: '40px' },
  sectionTitleLeft: { fontSize: '42px', fontWeight: '800', color: '#38bdf8', marginBottom: '20px', textAlign: 'left' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' },
  iconContainer: { fontSize: '30px', marginBottom: '20px' },
  cardTitle: { fontSize: '22px', fontWeight: '700', marginBottom: '10px' },
  cardDesc: { color: '#94a3b8', lineHeight: '1.6' },
  blogSection: { padding: '80px 20px' },
  carouselContainer: { maxWidth: '700px', margin: '0 auto' },
  reviewCard: { backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.1)', textAlign: 'center' },
  reviewImg: { width: '80px', height: '80px', borderRadius: '50%', marginBottom: '20px', border: '3px solid #38bdf8' },
  reviewText: { fontSize: '18px', fontStyle: 'italic', color: '#e2e8f0' },
  contactGlassCard: { background: 'rgba(30, 41, 59, 0.2)', borderRadius: '32px', padding: '40px 0px', maxWidth: '1000px', margin: '0' },
  contactFlexRow: { display: 'flex', gap: '40px', flexWrap: 'wrap' },
  contactInfoSide: { flex: 1, minWidth: '300px', textAlign: 'left' },
  contactImageWrap: { width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' },
  contactInnerImage: { width: '100%', height: '100%', objectFit: 'cover' },
  addressBox: { marginTop: '10px' },
  infoItem: { color: '#cbd5e1', marginBottom: '15px', fontSize: '16px' },
  form: { flex: 1.5, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '15px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(15, 23, 42, 1)', borderRadius: '10px', color: '#fff' },
  footer: { padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#475569' },
  aboutFlex: { display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' },
  aboutText: { fontSize: '18px', color: '#94a3b8', lineHeight: '1.8', textAlign: 'left' },
  placeholderImg: { flex: 1, height: '350px', minWidth: '300px' },
  fullImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }
};