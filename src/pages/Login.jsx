import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';
import { LogIn, UserPlus } from 'lucide-react';

export function Login() {
  const { signIn, signUp, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignUP, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const origin = location.state?.from?.pathname || '/catalog';
      navigate(origin, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    if (password.length < 6) {
      showNotification('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      setLoading(true);
      if (isSignUP) {
        if (!fullName) {
          showNotification('Please enter your full name', 'error');
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
        showNotification('Registration successful! Please sign in.', 'success');
        setIsSignUp(false); // flip to sign in form
      } else {
        await signIn(email, password);
        const name = email.split('@')[0];
        showNotification(`Welcome back, ${name}!`);
      }
    } catch (error) {
      showNotification(error.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel login-panel animate-fade-in">
        <div className="login-header">
          <div className="supreme-logo-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" className="brand-icon">
              <defs>
                <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffb3c6" />
                  <stop offset="50%" stop-color="#ff4d6d" />
                  <stop offset="100%" stop-color="#c1121f" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <rect width="120" height="120" rx="28" fill="#2d111b" />
              <g transform="translate(15, 15) scale(0.75)" filter="url(#glow)">
                <path d="M40 90 C 10 90, 10 60, 40 60 C 80 60, 80 30, 50 30 C 20 30, 20 15, 50 15 C 100 15, 100 60, 50 60 C 10 60, 10 105, 50 105 C 80 105, 80 90, 50 90" fill="none" stroke="url(#markGrad)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 45 45 L 85 45 L 85 85" fill="none" stroke="#ffe5ec" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M 85 45 L 105 25" fill="none" stroke="#ffe5ec" strokeWidth="8" strokeLinecap="round" />
                <circle cx="105" cy="25" r="8" fill="#ffb3c6" />
                <circle cx="45" cy="45" r="6" fill="#ffb3c6" />
                <circle cx="85" cy="85" r="6" fill="#ffb3c6" />
              </g>
            </svg>
            <div className="supreme-text">
              <span className="logo-su">Su</span>
              <span className="logo-pre">Pre</span>
              <span className="logo-me">Me</span>
              <span className="logo-learning"> Learning</span>
            </div>
          </div>
          <h1>{isSignUP ? 'Create an Account' : 'Welcome Back'}</h1>
          <p>{isSignUP ? 'Join our elite AI landscape platform' : 'Sign in to jump back into your ML courses'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {isSignUP && (
            <div className="input-group">
              <label htmlFor="fullName" className="input-label">Full Name</label>
              <input 
                type="text" 
                id="fullName"
                className="input-field"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <input 
              type="email" 
              id="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input 
              type="password" 
              id="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? (
              <span className="loader-dot">...</span>
            ) : isSignUP ? (
              <><UserPlus size={18} /> Sign Up</>
            ) : (
              <><LogIn size={18} /> Sign In</>
            )}
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            {isSignUP ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" className="text-btn" onClick={() => setIsSignUp(!isSignUP)}>
              {isSignUP ? 'Sign In' : 'Register Here'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: radial-gradient(circle at top right, var(--bg-secondary), var(--bg-primary));
        }
        .login-panel {
          padding: 3.5rem;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .login-header {
          text-align: center;
        }
        
        /* SuPreMe Learning Logo Form */
        .supreme-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .brand-icon {
          width: 55px;
          height: 55px;
          flex-shrink: 0;
        }
        .supreme-text {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          font-family: inherit;
          display: flex;
          align-items: center;
        }
        .logo-su { color: var(--text-primary); }
        .logo-pre { color: var(--accent-primary); }
        .logo-me { color: var(--text-secondary); text-transform: uppercase; font-size: 0.9em; }
        .logo-learning { font-weight: 300; letter-spacing: 1px; color: var(--text-secondary); }

        .login-header h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .login-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .login-btn {
          width: 100%;
          margin-top: 1rem;
          height: 48px;
        }
        .toggle-auth {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .text-btn {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.5rem;
          font-size: inherit;
          font-family: inherit;
        }
        .text-btn:hover {
          text-decoration: underline;
        }
        .loader-dot {
          display: inline-block;
          animation: blink 1.4s infinite both;
        }
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
