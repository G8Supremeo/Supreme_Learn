import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, Rocket, Activity } from 'lucide-react';

export function Landing() {
  return (
    <div className="landing-container animate-fade-in">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">Welcome to the future of learning</div>
          <h1 className="hero-title">
            Master the Future of AI with <span className="text-gradient">SupreMify</span>
          </h1>
          <p className="hero-description">
            Dive into world-class curriculum spanning MLOps, Agentic AI, and Generative Networks. 
            Elevate your engineering career today in a premium, glassmorphic environment.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary landing-btn-primary">
              <Rocket size={18} /> Start for Free
            </Link>
            <Link to="/login" className="btn btn-secondary landing-btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Advert Section */}
      <section className="adverts-section">
        <h2 className="section-title">Explore Premium Courses</h2>
        <div className="advert-grid">
          
          <div className="glass-panel advert-card">
            <div className="advert-icon-wrap ai-icon-wrap">
              <BrainCircuit size={32} />
            </div>
            <h3>Generative AI & LLMs</h3>
            <p>Master Transformer architectures, fine-tuning LLaMA 3, and deploying production RAG pipelines.</p>
            <div className="advert-footer">
              <span className="course-tag">Extremely Popular</span>
              <Link to="/login" className="advert-link">Enroll Now &rarr;</Link>
            </div>
          </div>

          <div className="glass-panel advert-card">
            <div className="advert-icon-wrap mlops-icon-wrap">
              <Activity size={32} />
            </div>
            <h3>MLOps & Infrastructure</h3>
            <p>Architect robust, highly available machine learning infrastructure using Kubernetes and MLflow.</p>
            <div className="advert-footer">
              <span className="course-tag">Advanced</span>
              <Link to="/login" className="advert-link">Enroll Now &rarr;</Link>
            </div>
          </div>

          <div className="glass-panel advert-card">
            <div className="advert-icon-wrap agents-icon-wrap">
              <BookOpen size={32} />
            </div>
            <h3>Agentic Engineering</h3>
            <p>Build autonomous, reasoning AI agents capable of long-term planning, tool use, and self-reflection.</p>
            <div className="advert-footer">
              <span className="course-tag">New Release</span>
              <Link to="/login" className="advert-link">Enroll Now &rarr;</Link>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .landing-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        }

        /* Hero CSS */
        .hero-section {
          position: relative;
          padding: 8rem 2rem 5rem;
          display: flex;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 80vh;
          background: radial-gradient(circle at top, rgba(14, 165, 233, 0.15) 0%, rgba(16, 185, 129, 0.05) 40%, transparent 70%);
          z-index: -1;
          pointer-events: none;
        }

        .hero-content {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--accent-primary);
          font-weight: 600;
          font-size: 0.85rem;
          border: 1px solid rgba(14, 165, 233, 0.2);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 1rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .landing-btn-primary {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 12px;
        }

        .landing-btn-secondary {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
        }

        .landing-btn-secondary:hover {
          background: var(--bg-secondary);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        /* Adverts CSS */
        .adverts-section {
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .section-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3rem;
        }

        .advert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .advert-card {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 24px;
        }

        .advert-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.1);
        }

        .advert-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 0.5rem;
        }

        .ai-icon-wrap { background: linear-gradient(135deg, #0ea5e9, #6366f1); }
        .mlops-icon-wrap { background: linear-gradient(135deg, #10b981, #059669); }
        .agents-icon-wrap { background: linear-gradient(135deg, #8b5cf6, #d946ef); }

        .advert-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .advert-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          flex: 1;
        }

        .advert-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .course-tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
        }

        .advert-link {
          font-weight: 600;
          color: var(--accent-primary);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .advert-link:hover {
          color: var(--accent-hover);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-section {
            padding: 5rem 1rem 3rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .landing-btn-primary, .landing-btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
