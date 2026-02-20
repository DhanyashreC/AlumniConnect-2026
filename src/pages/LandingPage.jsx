import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [currentReview, setCurrentReview] = useState(0);
  
  // --- ADDED: State for Contact Form ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // --- ADDED: Form Submission Handler ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // You can replace this with an API call later
    console.log("Message Sent:", formData);
    
    alert(`Thank you, ${formData.name}! Your message has been sent to the PlacementPro team.`);
    
    // Reset form after success
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.container}>
      {/* --- STICKY NAVBAR --- */}
      <nav style={styles.nav}>
        <div style={styles.logo}>PlacementPro 🚀</div>
        <div style={styles.navLinks}>
          <span onClick={() => scrollToSection('home')} style={styles.navItem}>Home</span>
          <span onClick={() => scrollToSection('services')} style={styles.navItem}>Services</span>
          <span onClick={() => scrollToSection('blog')} style={styles.navItem}>Blog</span>
          <span onClick={() => scrollToSection('about')} style={styles.navItem}>About</span>
          <span onClick={() => scrollToSection('contact')} style={styles.navItem}>Contact</span>
        </div>
        <div style={styles.authLinks}>
          <Link to="/login" style={styles.navItem}>Login</Link>
          <Link to="/register" style={styles.primaryBtnSmall}>Register</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Your Career Journey, <span style={{color: '#38bdf8'}}>Accelerated.</span></h1>
          <p style={styles.subtitle}>
            The all-in-one ecosystem for students to land dream jobs and alumni to mentor the next generation.
          </p>
          <div style={styles.buttonGroup}>
            <Link to="/register" style={styles.primaryBtn}>Get Started Free</Link>
            <button onClick={() => scrollToSection('services')} style={styles.secondaryBtn}>Explore Features</button>
          </div>
        </div>
      </header>

      {/* --- SERVICES SECTION --- */}
      <section id="services" style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.icon}>💼</div>
            <h3>Job Board</h3>
            <p>Access exclusive off-campus and on-campus drives with one-click apply.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.icon}>🚀</div>
            <h3>Skill Assessments</h3>
            <p>Coding, Aptitude, and AI-driven Mock Interviews to sharpen your edge.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.icon}>🤝</div>
            <h3>Alumni Network</h3>
            <p>Connect with seniors working at top Fortune 500 companies.</p>
          </div>
        </div>
      </section>

      {/* --- SUCCESS STORIES --- */}
      <section id="blog" style={styles.blogSection}>
        <h2 style={styles.sectionTitle}>Success Stories</h2>
        <div style={styles.carouselContainer}>
          <div style={styles.reviewCard}>
            <img src={reviews[currentReview].img} alt="User" style={styles.reviewImg} />
            <p style={styles.reviewText}>"{reviews[currentReview].text}"</p>
            <h4 style={{color: '#38bdf8', margin: '10px 0 5px 0'}}>{reviews[currentReview].name}</h4>
            <small style={{color: '#94a3b8'}}>{reviews[currentReview].role}</small>
          </div>
          <div style={styles.dots}>
            {reviews.map((_, i) => (
              <div key={i} style={{...styles.dot, backgroundColor: i === currentReview ? '#38bdf8' : '#334155'}} />
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" style={{...styles.section, backgroundColor: '#1e293b'}}>
        <div style={styles.aboutFlex}>
          <div style={{flex: 1}}>
            <h2 style={styles.sectionTitleLeft}>About Us</h2>
            <p style={styles.aboutText}>
              PlacementPro was founded with a single mission: To bridge the gap between academic learning and corporate expectations. We provide a transparent platform where TPOs can manage drives, and students can prepare with industry-standard tools.
            </p>
          </div>
          <div style={styles.placeholderImg}>
             {/* Replace this with an actual image tag when ready */}
             <span style={{textAlign: 'center', padding: '20px'}}>Professional Image: Students Celebrating Placements</span>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (UPDATED) --- */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>Get In Touch</h2>
        <div style={styles.contactContainer}>
          <div style={styles.contactInfo}>
            <p>📍 123 Education Lane, Tech City</p>
            <p>📧 support@placementpro.com</p>
            <p>📞 +91 98765 43210</p>
          </div>
          
          {/* Form updated with value and onChange */}
          <form style={styles.form} onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={styles.input} 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              style={styles.input} 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <textarea 
              placeholder="Your Message" 
              style={{...styles.input, height: '100px'}}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
            <button type="submit" style={styles.primaryBtn}>Send Message</button>
          </form>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 PlacementPro Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ... styles remain the same as your previous code ...
const styles = {
  container: { backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', scrollBehavior: 'smooth' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', backgroundColor: '#0f172a', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #1e293b' },
  logo: { fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' },
  navLinks: { display: 'flex', gap: '30px' },
  navItem: { color: '#cbd5e1', cursor: 'pointer', fontSize: '15px', textDecoration: 'none', transition: '0.3s' },
  authLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  primaryBtnSmall: { backgroundColor: '#38bdf8', color: '#0f172a', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' },
  
  hero: { padding: '150px 20px', textAlign: 'center', background: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)' },
  title: { fontSize: '60px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' },
  subtitle: { fontSize: '20px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 40px auto' },
  buttonGroup: { display: 'flex', justifyContent: 'center', gap: '20px' },
  primaryBtn: { backgroundColor: '#38bdf8', color: '#0f172a', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer' },
  secondaryBtn: { border: '1px solid #334155', backgroundColor: 'transparent', color: '#f8fafc', padding: '14px 32px', borderRadius: '8px', cursor: 'pointer' },

  section: { padding: '100px 50px' },
  sectionTitle: { fontSize: '36px', textAlign: 'center', marginBottom: '60px', color: '#38bdf8' },
  sectionTitleLeft: { fontSize: '36px', marginBottom: '30px', color: '#38bdf8' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '20px', border: '1px solid #334155', textAlign: 'center', transition: 'transform 0.3s' },
  icon: { fontSize: '40px', marginBottom: '20px' },

  blogSection: { padding: '100px 20px', backgroundColor: '#111827' },
  carouselContainer: { maxWidth: '800px', margin: '0 auto', textAlign: 'center' },
  reviewCard: { backgroundColor: '#1e293b', padding: '40px', borderRadius: '20px', border: '1px solid #38bdf833' },
  reviewImg: { width: '80px', height: '80px', borderRadius: '50%', marginBottom: '20px', border: '3px solid #38bdf8' },
  reviewText: { fontSize: '18px', fontStyle: 'italic', color: '#e2e8f0' },
  dots: { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', transition: '0.3s' },

  aboutFlex: { display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' },
  aboutText: { fontSize: '18px', lineHeight: '1.8', color: '#94a3b8' },
  placeholderImg: { flex: 1, backgroundColor: '#334155', height: '300px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' },

  contactContainer: { display: 'flex', gap: '50px', flexWrap: 'wrap' },
  contactInfo: { flex: 1, fontSize: '18px', color: '#cbd5e1' },
  form: { flex: 2, display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '15px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white' },
  
  footer: { textAlign: 'center', padding: '40px', borderTop: '1px solid #1e293b', color: '#64748b' }
};