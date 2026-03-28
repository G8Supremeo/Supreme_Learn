import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';
import { LogIn, UserPlus } from 'lucide-react';

export function Login() {
  const { signIn, signUp, signInWithGoogle, isAuthenticated } = useAuth();
  const { showNotification, notification } = useNotification();
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
    setLoading(true);

    try {
      if (isSignUP) {
        if (!email || !email.includes('@')) {
          throw new Error('Please enter a valid email address');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (!fullName) {
          throw new Error('Please enter your full name');
        }
        await signUp(email, password, fullName);
        showNotification('Registration successful! Please confirm your email.', 'success');
        setIsSignUp(false); // flip to sign in form
      } else {
        if (!email || !email.includes('@')) {
          throw new Error('Please enter a valid email address');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await signIn(email, password);
        showNotification('Welcome back!', 'success');
        navigate('/catalog'); // Changed from /dashboard to /catalog to match original logic
      }
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="login-container">
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glass-panel login-panel animate-fade-in">
        <div className="login-header">
          <Link to="/" className="supreme-logo-link">
            <div className="supreme-logo-wrapper">
              <img src="/favicon.svg" alt="Supreme University Logo" className="brand-icon" />
              <div className="supreme-text">
                <span className="logo-su">Su</span>
                <span className="logo-pre">Pre</span>
                <span className="logo-me">Me</span>
                <span className="logo-learning">University</span>
              </div>
            </div>
          </Link>
          <h1>{isSignUP ? 'Create an Account' : 'Welcome Back'}</h1>
          <p>{isSignUP ? 'Join our elite AI landscape platform' : 'Sign in to jump back into your ML courses'}</p>
        </div>

        {notification && (
          <div className={`auth-alert ${notification.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUP && (
            <div className="input-group">
              <label htmlFor="fullName" className="input-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="input-field"
                placeholder="Odogwu Emekus"
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
              placeholder="odogwu@mekus.com"
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

        <div className="oauth-divider">
          <span>or continue with</span>
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} className="btn-social">
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 41.939 C -8.804 40.009 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
            </g>
          </svg>
          Google
        </button>

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
        /* The Container & Light Mesh Gradient */
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: #fdfbfb;
          background: radial-gradient(circle at top right, #fff0f3, #f8f9fa, #e9ecef);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Ambient Glowing Orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.7;
          animation: floatOrb 12s ease-in-out infinite alternate;
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 {
          width: 450px;
          height: 450px;
          background: rgba(255, 143, 163, 0.4); /* Pastel Rosy Pink */
          top: -100px;
          left: -100px;
        }
        .orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(162, 210, 255, 0.4); /* Pastel Blue */
          bottom: -50px;
          right: -100px;
          animation-delay: -6s;
        }
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -40px) scale(1.15); }
        }

        /* Premium Light Glassmorphism Panel */
        .login-panel {
          position: relative;
          z-index: 10;
          padding: 3.5rem;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        
        /* Typography Header */
        .login-header {
          text-align: center;
        }
        .supreme-logo-link {
          text-decoration: none;
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .supreme-logo-link:hover {
          transform: scale(1.02);
        }
        .supreme-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .brand-icon {
          width: 85px;
          height: 85px;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.15));
        }
        .supreme-text {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -1px;
          font-family: inherit;
          display: flex;
          align-items: baseline;
        }
        .logo-su { color: #2b2d42; }
        .logo-pre { color: var(--accent-primary, #ff4d6d); }
        .logo-me { color: #6c757d; }
        .logo-learning { font-weight: 600; font-size: 0.35em; color: var(--accent-primary, #ff4d6d); margin-left: 2px; text-transform: uppercase; letter-spacing: 1.5px;}

        .login-header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #2b2d42;
          margin-bottom: 0.5rem;
        }
        .login-header p {
          color: #6c757d;
          font-size: 0.95rem;
          letter-spacing: 0.2px;
        }

        /* Form & Immersive Inputs */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #495057;
          margin-left: 4px;
        }
        .input-field {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #2b2d42;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .input-field::placeholder {
          color: #adb5bd;
        }
        .input-field:focus {
          background: #ffffff;
          border-color: var(--accent-primary, #ff4d6d);
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
        }

        /* Primary Call to Action Button */
        .login-btn {
          width: 100%;
          margin-top: 0.5rem;
          height: 52px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #ff4d6d 0%, #ff7ea5 100%);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(14, 165, 233, 0.35);
          filter: brightness(1.05);
        }
        .login-btn:active {
          transform: translateY(0);
        }

        /* Elegant OAuth Divider */
        .oauth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #adb5bd;
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0.25rem 0;
        }
        .oauth-divider::before,
        .oauth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .oauth-divider span {
          padding: 0 16px;
        }

        /* Beautiful Social Button (Google) */
        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #495057;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .btn-social:hover {
          background: #f8f9fa;
          border-color: rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
        }
        .btn-social:active {
          transform: translateY(0);
        }

        /* Alerts */
        .auth-alert {
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .alert-danger {
          background: rgba(14, 165, 233, 0.1);
          color: #e5383b;
          border: 1px solid rgba(14, 165, 233, 0.2);
        }
        .alert-success {
          background: rgba(45, 106, 79, 0.1);
          color: #2d6a4f;
          border: 1px solid rgba(45, 106, 79, 0.2);
        }

        /* Toggle Text Link */
        .toggle-auth {
          text-align: center;
          font-size: 0.9rem;
          color: #6c757d;
          margin-top: 0.5rem;
        }
        .text-btn {
          background: none;
          border: none;
          color: var(--accent-primary, #ff4d6d);
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.5rem;
          font-size: inherit;
          font-family: inherit;
          transition: color 0.2s ease;
        }
        .text-btn:hover {
          color: #c9184a;
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

        /* Mobile Adjustments */
        @media (max-width: 600px) {
          .login-panel { padding: 2rem 1.5rem; gap: 1.5rem; border-radius: 20px; margin: 1rem; }
          .brand-icon { width: 60px; height: 60px; }
          .supreme-text { font-size: 1.8rem; }
          .login-header h1 { font-size: 1.6rem; }
          .login-header p { font-size: 0.85rem; }
          .input-field { padding: 12px; font-size: 0.95rem; }
          .login-btn { height: 48px; }
        }
      `}</style>
    </div>
  );
}
