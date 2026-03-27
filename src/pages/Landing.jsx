import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { BookOpen, BrainCircuit, Rocket, Activity, Zap, GraduationCap, Code2, Award, Users, PlayCircle, Star, ArrowRight, Mail, Globe, Briefcase, MessageCircle, ChevronRight, Shield, Cpu, FlaskConical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_COURSES } from '../data/mockData';

/* ───── Intersection Observer hook for scroll animations ───── */
function useScrollReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ───── Animated counter ───── */
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ───── Section wrapper with scroll reveal ───── */
function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <section
      ref={ref}
      className={`${className} reveal-section ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export function Landing() {
  const { isAuthenticated, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    { icon: <BrainCircuit size={28} />, title: 'AI-Powered Learning', desc: 'Adaptive curriculum that evolves with your skill level using intelligent AI tutoring systems.', gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)' },
    { icon: <GraduationCap size={28} />, title: 'Expert Instructors', desc: 'Learn from industry pioneers and renowned researchers at the forefront of AI innovation.', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { icon: <FlaskConical size={28} />, title: 'Hands-on Labs', desc: 'Production-grade coding environments with real GPU access for training and experimentation.', gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)' },
    { icon: <Shield size={28} />, title: 'Industry Certificates', desc: 'Earn verifiable credentials recognized by Fortune 500 companies and top-tier AI labs.', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'ML Engineer @ Google', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah', text: 'SupreMify transformed my career trajectory. The RAG pipeline course alone landed me my dream role. The hands-on labs are unmatched.', rating: 5 },
    { name: 'Marcus Okafor', role: 'Senior Data Scientist @ Meta', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus', text: 'The MLOps curriculum is the most production-realistic I\'ve ever experienced. Went from Jupyter notebooks to deploying at scale in weeks.', rating: 5 },
    { name: 'Dr. Elena Vasquez', role: 'AI Researcher @ DeepMind', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Elena', text: 'Finally, a platform that treats fine-tuning and alignment with the seriousness they deserve. The RLHF vs DPO module is exceptional.', rating: 5 },
  ];

  return (
    <div className="landing-container">

      {/* ═══════ LANDING NAVBAR ═══════ */}
      <nav className={`landing-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <img src="/favicon.svg" alt="SupreMify" className="nav-logo" />
            <span className="nav-brand-text">SupreMify</span>
          </Link>
          <div className="nav-links-landing">
            <a href="#features" className="nav-link-landing">Features</a>
            <a href="#courses" className="nav-link-landing">Courses</a>
            <a href="#testimonials" className="nav-link-landing">Reviews</a>
          </div>
          <div className="nav-cta-group">
            <Link to="/login" className="nav-login-btn">Sign In</Link>
            <Link to="/login" className="btn btn-primary nav-signup-btn">
              <Rocket size={16} /> Get Started Free
            </Link>
          </div>
        </div>
      </nav>


      {/* ═══════ HERO SECTION ═══════ */}
      <section className="hero-section">
        {/* Animated background shapes */}
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="floating-shape shape-1" />
          <div className="floating-shape shape-2" />
          <div className="floating-shape shape-3" />
          <div className="floating-shape shape-4" />
          <div className="floating-shape shape-5" />
          <div className="grid-overlay" />
        </div>

        <div className="hero-content animate-hero">
          <div className="hero-badge-wrap">
            <span className="hero-badge">
              <Zap size={14} /> Now with Agentic AI & LLM Fine-Tuning Tracks
            </span>
          </div>

          <h1 className="hero-title">
            Master the Future of <br />
            <span className="text-gradient-animated">Artificial Intelligence</span>
          </h1>

          <p className="hero-description">
            World-class curriculum spanning MLOps, Agentic AI, Generative Networks, and LLM Alignment.
            Launch your engineering career with production-grade skills — from concept to deployment.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary hero-btn-primary">
              <Rocket size={18} /> Start Learning for Free
            </Link>
            <a href="#courses" className="btn hero-btn-ghost">
              Explore Courses <ArrowRight size={16} />
            </a>
          </div>

          <div className="hero-social-proof">
            <div className="avatar-stack">
              {['Alex', 'Bella', 'Carlos', 'Diana', 'Erik'].map(name => (
                <img key={name} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`} alt="" className="stack-avatar" />
              ))}
            </div>
            <span className="proof-text">Join <strong>12,000+</strong> learners worldwide</span>
          </div>
        </div>
      </section>


      {/* ═══════ STATS BAR ═══════ */}
      <RevealSection className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={12000} suffix="+" /></span>
            <span className="stat-label">Active Students</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={4} /></span>
            <span className="stat-label">Expert-Led Courses</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={96} suffix="%" /></span>
            <span className="stat-label">Completion Rate</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={4.9} suffix="/5" duration={1500} /></span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </RevealSection>


      {/* ═══════ FEATURES ═══════ */}
      <RevealSection className="features-section" id="features">
        <div className="section-header">
          <span className="section-badge">Why SupreMify?</span>
          <h2 className="section-title-main">Everything You Need to <span className="text-gradient">Excel in AI</span></h2>
          <p className="section-subtitle">Built by engineers, for engineers. Every feature designed to accelerate your path from learner to practitioner.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-panel" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="feature-icon" style={{ background: f.gradient }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ═══════ COURSE PREVIEWS ═══════ */}
      <RevealSection className="courses-section" id="courses">
        <div className="section-header">
          <span className="section-badge">Curriculum</span>
          <h2 className="section-title-main">Explore Premium <span className="text-gradient">Courses</span></h2>
          <p className="section-subtitle">Deep-dive into cutting-edge topics taught by world-renowned AI researchers and engineers.</p>
        </div>
        <div className="courses-grid">
          {INITIAL_COURSES.map((course, i) => (
            <div key={course.id} className="course-preview-card" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="course-img-wrap">
                <img src={course.thumbnail} alt={course.title} className="course-img" />
                <div className="course-overlay">
                  <span className="course-level-badge">{course.level}</span>
                </div>
              </div>
              <div className="course-preview-body">
                <h3>{course.title}</h3>
                <p className="course-instructor"><Users size={14} /> {course.instructor}</p>
                <div className="course-meta-bar">
                  <span><PlayCircle size={14} /> {course.lessons.length} Lessons</span>
                  <span><Award size={14} /> 20-Q Exam</span>
                </div>
                <Link to="/login" className="course-enroll-link">
                  Enroll Now <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ═══════ TESTIMONIALS ═══════ */}
      <RevealSection className="testimonials-section" id="testimonials">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title-main">Loved by <span className="text-gradient">AI Engineers</span></h2>
          <p className="section-subtitle">Hear from professionals who transformed their careers with SupreMify.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card glass-panel" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>


      {/* ═══════ CTA BANNER ═══════ */}
      <RevealSection className="cta-banner-section">
        <div className="cta-banner">
          <div className="cta-bg-shapes">
            <div className="cta-shape cta-shape-1" />
            <div className="cta-shape cta-shape-2" />
          </div>
          <h2>Ready to Build the Future?</h2>
          <p>Join thousands of engineers mastering AI, MLOps, and LLM alignment on SupreMify.</p>
          <Link to="/login" className="btn btn-primary cta-banner-btn">
            <Rocket size={18} /> Start Your Journey — It's Free
          </Link>
        </div>
      </RevealSection>


      {/* ═══════ FOOTER ═══════ */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img src="/favicon.svg" alt="SupreMify" className="footer-logo" />
              <span>SupreMify</span>
            </div>
            <p className="footer-desc">The premium AI & ML learning platform engineered for professionals who build the future.</p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Website"><Globe size={18} /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><Briefcase size={18} /></a>
              <a href="#" className="social-link" aria-label="Community"><MessageCircle size={18} /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#courses">Courses</a>
            <a href="#testimonials">Reviews</a>
            <Link to="/login">Sign In</Link>
          </div>

          <div className="footer-links-col">
            <h4>Courses</h4>
            <Link to="/login">Agentic AI & RAG</Link>
            <Link to="/login">MLOps & Big Data</Link>
            <Link to="/login">LLM Fine-Tuning</Link>
            <Link to="/login">GANs & Diffusion</Link>
          </div>

          <div className="footer-links-col">
            <h4>Stay Updated</h4>
            <p className="newsletter-text">Get notified about new courses and AI breakthroughs.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="your@email.com" className="newsletter-input" />
              <button className="newsletter-btn"><Mail size={16} /></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SupreMify. All rights reserved.</span>
          <span>Crafted with passion for AI education.</span>
        </div>
      </footer>


      {/* ═══════ ALL CSS ═══════ */}
      <style>{`
        /* ── Reset & Container ── */
        .landing-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Scroll Reveal ── */
        .reveal-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Loading Spinner ── */
        .loading-spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--glass-border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ═══════ NAVBAR ═══════ */
        .landing-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 1rem 2rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .landing-nav.nav-scrolled {
          padding: 0.5rem 2rem;
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1.5rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(14,165,233,0.1);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: all 0.4s ease;
        }
        .nav-scrolled .nav-inner {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          border-color: rgba(14,165,233,0.15);
        }
        [data-theme='dark'] .nav-inner {
          background: rgba(15,23,42,0.75);
          border-color: rgba(14,165,233,0.15);
        }
        .nav-brand {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .nav-logo { height: 36px; width: 36px; }
        .nav-brand-text {
          font-weight: 700; font-size: 1.4rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .nav-links-landing {
          display: flex; gap: 2rem;
        }
        .nav-link-landing {
          color: var(--text-secondary); font-weight: 500; text-decoration: none;
          transition: color 0.3s; font-size: 0.95rem;
        }
        .nav-link-landing:hover { color: var(--accent-primary); }
        .nav-cta-group {
          display: flex; align-items: center; gap: 1rem;
        }
        .nav-login-btn {
          color: var(--text-secondary); font-weight: 600; text-decoration: none;
          transition: color 0.3s; font-size: 0.95rem;
        }
        .nav-login-btn:hover { color: var(--accent-primary); }
        .nav-signup-btn {
          padding: 0.6rem 1.2rem; font-size: 0.9rem; border-radius: 12px;
        }

        /* ═══════ HERO ═══════ */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 8rem 2rem 5rem;
          text-align: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: -1; overflow: hidden;
        }
        .hero-gradient {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(14,165,233,0.15) 0%, rgba(16,185,129,0.08) 40%, transparent 70%);
        }
        [data-theme='dark'] .hero-gradient {
          background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(14,165,233,0.12) 0%, rgba(16,185,129,0.05) 40%, transparent 70%);
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%);
        }

        /* Floating Shapes */
        .floating-shape {
          position: absolute; border-radius: 50%; opacity: 0.15;
          animation: floatShape 20s ease-in-out infinite;
        }
        .shape-1 {
          width: 300px; height: 300px; top: 10%; left: -5%;
          background: radial-gradient(circle, var(--accent-primary), transparent 70%);
          animation-duration: 18s;
        }
        .shape-2 {
          width: 200px; height: 200px; top: 60%; right: -3%;
          background: radial-gradient(circle, var(--accent-secondary), transparent 70%);
          animation-duration: 22s; animation-delay: -5s;
        }
        .shape-3 {
          width: 150px; height: 150px; top: 20%; right: 15%;
          background: radial-gradient(circle, #8b5cf6, transparent 70%);
          animation-duration: 16s; animation-delay: -8s;
        }
        .shape-4 {
          width: 100px; height: 100px; bottom: 15%; left: 10%;
          background: radial-gradient(circle, #f59e0b, transparent 70%);
          animation-duration: 25s; animation-delay: -3s;
        }
        .shape-5 {
          width: 180px; height: 180px; bottom: 30%; right: 25%;
          background: radial-gradient(circle, #ec4899, transparent 70%);
          animation-duration: 20s; animation-delay: -10s;
        }
        @keyframes floatShape {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(40px, 30px) scale(1.05); }
        }

        /* Hero Content */
        .animate-hero {
          animation: heroEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-content {
          max-width: 850px;
          display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
          position: relative; z-index: 1;
        }
        .hero-badge-wrap { display: flex; justify-content: center; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          border-radius: 9999px;
          background: rgba(14,165,233,0.08);
          color: var(--accent-primary);
          font-weight: 600; font-size: 0.85rem;
          border: 1px solid rgba(14,165,233,0.2);
          text-transform: uppercase; letter-spacing: 0.5px;
          animation: badgePulse 3s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,165,233,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(14,165,233,0); }
        }
        .hero-title {
          font-size: 4.2rem; font-weight: 800; line-height: 1.1;
          color: var(--text-primary); margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }
        .text-gradient-animated {
          background: linear-gradient(135deg, var(--accent-primary), #8b5cf6, var(--accent-secondary), var(--accent-primary));
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: gradientShift 6s ease infinite;
        }
        .text-gradient {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-description {
          font-size: 1.25rem; color: var(--text-secondary);
          line-height: 1.7; max-width: 640px;
        }
        .hero-actions {
          display: flex; gap: 1rem; align-items: center;
          margin-top: 0.5rem;
        }
        .hero-btn-primary {
          padding: 1rem 2rem; font-size: 1.1rem; border-radius: 14px;
        }
        .hero-btn-ghost {
          padding: 1rem 1.5rem; font-size: 1rem; border-radius: 14px;
          background: transparent;
          color: var(--text-primary); font-weight: 600;
          border: 1.5px solid var(--glass-border);
          display: inline-flex; align-items: center; gap: 0.5rem;
          transition: all 0.3s;
        }
        .hero-btn-ghost:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          transform: translateY(-2px);
        }
        .hero-social-proof {
          display: flex; align-items: center; gap: 1rem; margin-top: 1rem;
        }
        .avatar-stack {
          display: flex;
        }
        .stack-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2px solid var(--bg-primary);
          margin-left: -10px; background: var(--bg-secondary);
        }
        .stack-avatar:first-child { margin-left: 0; }
        .proof-text {
          font-size: 0.9rem; color: var(--text-secondary);
        }

        /* ═══════ STATS BAR ═══════ */
        .stats-section {
          padding: 0 2rem;
          margin-top: -2rem;
          position: relative; z-index: 5;
        }
        .stats-grid {
          max-width: 1000px; margin: 0 auto;
          display: flex; align-items: center; justify-content: center;
          gap: 2.5rem;
          padding: 2.5rem 3rem;
          background: var(--card-bg);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        [data-theme='dark'] .stats-grid {
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .stat-item {
          display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
          flex: 1;
        }
        .stat-number {
          font-size: 2.2rem; font-weight: 800;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-label {
          font-size: 0.85rem; font-weight: 500; color: var(--text-secondary);
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .stat-divider {
          width: 1px; height: 40px; background: var(--glass-border);
        }

        /* ═══════ SECTION HEADERS ═══════ */
        .section-header {
          text-align: center; margin-bottom: 3.5rem;
        }
        .section-badge {
          display: inline-block;
          padding: 0.4rem 1rem; border-radius: 9999px;
          background: rgba(14,165,233,0.08); color: var(--accent-primary);
          font-weight: 600; font-size: 0.8rem; text-transform: uppercase;
          letter-spacing: 1px; margin-bottom: 1rem;
          border: 1px solid rgba(14,165,233,0.15);
        }
        .section-title-main {
          font-size: 2.8rem; font-weight: 800; color: var(--text-primary);
          line-height: 1.2; margin-bottom: 1rem;
        }
        .section-subtitle {
          font-size: 1.15rem; color: var(--text-secondary);
          max-width: 600px; margin: 0 auto; line-height: 1.6;
        }

        /* ═══════ FEATURES ═══════ */
        .features-section {
          padding: 6rem 2rem;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }
        .features-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          padding: 2.5rem 2rem;
          border-radius: 20px;
          display: flex; flex-direction: column; gap: 1rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(14,165,233,0.12);
        }
        .feature-icon {
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .feature-card h3 {
          font-size: 1.3rem; font-weight: 700; color: var(--text-primary);
        }
        .feature-card p {
          color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;
        }

        /* ═══════ COURSES ═══════ */
        .courses-section {
          padding: 6rem 2rem;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }
        .courses-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .course-preview-card {
          border-radius: 20px; overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .course-preview-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(14,165,233,0.12);
        }
        .course-img-wrap {
          position: relative; overflow: hidden; height: 180px;
        }
        .course-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .course-preview-card:hover .course-img {
          transform: scale(1.08);
        }
        .course-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%);
          display: flex; align-items: flex-end; padding: 1rem;
        }
        .course-level-badge {
          padding: 0.3rem 0.8rem; border-radius: 8px;
          background: rgba(255,255,255,0.2); backdrop-filter: blur(8px);
          color: #fff; font-weight: 600; font-size: 0.75rem;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .course-preview-body {
          padding: 1.5rem;
          display: flex; flex-direction: column; gap: 0.75rem;
        }
        .course-preview-body h3 {
          font-size: 1.15rem; font-weight: 700; color: var(--text-primary);
          line-height: 1.3;
        }
        .course-instructor {
          display: flex; align-items: center; gap: 0.4rem;
          color: var(--text-secondary); font-size: 0.85rem;
        }
        .course-meta-bar {
          display: flex; gap: 1.2rem; font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .course-meta-bar span {
          display: flex; align-items: center; gap: 0.3rem;
        }
        .course-enroll-link {
          display: inline-flex; align-items: center; gap: 0.3rem;
          color: var(--accent-primary); font-weight: 600; font-size: 0.9rem;
          transition: gap 0.3s, color 0.3s;
          margin-top: 0.5rem;
        }
        .course-enroll-link:hover { gap: 0.6rem; color: var(--accent-hover); }

        /* ═══════ TESTIMONIALS ═══════ */
        .testimonials-section {
          padding: 6rem 2rem;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }
        .testimonials-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .testimonial-card {
          padding: 2.5rem 2rem; border-radius: 20px;
          display: flex; flex-direction: column; gap: 1.25rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(14,165,233,0.1);
        }
        .testimonial-stars { display: flex; gap: 2px; }
        .testimonial-text {
          font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary);
          font-style: italic; flex: 1;
        }
        .testimonial-author {
          display: flex; align-items: center; gap: 0.75rem;
          padding-top: 1rem; border-top: 1px solid var(--glass-border);
        }
        .testimonial-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--bg-secondary);
        }
        .testimonial-author div {
          display: flex; flex-direction: column;
        }
        .testimonial-author strong {
          color: var(--text-primary); font-size: 0.95rem;
        }
        .testimonial-author span {
          color: var(--text-secondary); font-size: 0.8rem;
        }

        /* ═══════ CTA BANNER ═══════ */
        .cta-banner-section {
          padding: 4rem 2rem;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }
        .cta-banner {
          position: relative; overflow: hidden;
          padding: 4rem 3rem;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--accent-primary), #6366f1, var(--accent-secondary));
          text-align: center; color: #fff;
        }
        .cta-bg-shapes {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
        }
        .cta-shape {
          position: absolute; border-radius: 50%; opacity: 0.15;
        }
        .cta-shape-1 {
          width: 300px; height: 300px; top: -100px; right: -60px;
          background: rgba(255,255,255,0.3);
          animation: floatShape 15s ease-in-out infinite;
        }
        .cta-shape-2 {
          width: 200px; height: 200px; bottom: -80px; left: -40px;
          background: rgba(255,255,255,0.2);
          animation: floatShape 20s ease-in-out infinite reverse;
        }
        .cta-banner h2 {
          font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;
          position: relative; z-index: 1;
        }
        .cta-banner p {
          font-size: 1.15rem; opacity: 0.9; margin-bottom: 2rem;
          max-width: 500px; margin-left: auto; margin-right: auto;
          position: relative; z-index: 1;
        }
        .cta-banner-btn {
          padding: 1rem 2.5rem; font-size: 1.1rem; border-radius: 14px;
          background: rgba(255,255,255,0.2); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          position: relative; z-index: 1;
        }
        .cta-banner-btn:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        /* ═══════ FOOTER ═══════ */
        .landing-footer {
          background: var(--card-bg);
          border-top: 1px solid var(--glass-border);
          padding: 4rem 2rem 0;
          margin-top: 2rem;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }
        .footer-brand {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 1rem;
        }
        .footer-logo { width: 32px; height: 32px; }
        .footer-brand span {
          font-weight: 700; font-size: 1.3rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .footer-desc {
          color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .footer-socials {
          display: flex; gap: 0.75rem;
        }
        .social-link {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-secondary); color: var(--text-secondary);
          transition: all 0.3s;
        }
        .social-link:hover {
          background: var(--accent-primary); color: #fff;
          transform: translateY(-2px);
        }
        .footer-links-col h4 {
          font-weight: 700; color: var(--text-primary);
          margin-bottom: 1rem; font-size: 0.95rem;
        }
        .footer-links-col a {
          display: block; color: var(--text-secondary);
          font-size: 0.9rem; margin-bottom: 0.6rem;
          transition: color 0.3s; text-decoration: none;
        }
        .footer-links-col a:hover { color: var(--accent-primary); }
        .newsletter-text {
          color: var(--text-secondary); font-size: 0.85rem;
          margin-bottom: 0.75rem; line-height: 1.5;
        }
        .newsletter-form {
          display: flex; gap: 0;
          border: 1px solid var(--glass-border); border-radius: 12px;
          overflow: hidden;
        }
        .newsletter-input {
          flex: 1; padding: 0.75rem 1rem;
          border: none; background: var(--bg-secondary);
          color: var(--text-primary); font-family: inherit;
          font-size: 0.85rem; outline: none;
        }
        .newsletter-btn {
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border: none; color: #fff; cursor: pointer;
          transition: opacity 0.3s;
        }
        .newsletter-btn:hover { opacity: 0.9; }
        .footer-bottom {
          max-width: 1200px; margin: 3rem auto 0;
          padding: 1.5rem 0;
          border-top: 1px solid var(--glass-border);
          display: flex; justify-content: space-between;
          color: var(--text-secondary); font-size: 0.8rem;
        }

        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 1024px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem; }
          .hero-section { padding: 7rem 1rem 4rem; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-btn-primary, .hero-btn-ghost { width: 100%; justify-content: center; }
          .nav-links-landing { display: none; }
          .section-title-main { font-size: 2rem; }
          .stats-grid {
            flex-direction: column; gap: 1.5rem;
            padding: 2rem 1.5rem;
          }
          .stat-divider { width: 50px; height: 1px; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
          .cta-banner { padding: 3rem 1.5rem; }
          .cta-banner h2 { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
}
