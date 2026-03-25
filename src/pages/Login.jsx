import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';
import { LogIn, UserPlus } from 'lucide-react';

export function Login() {
  const { signIn, signUp, isAuthenticated } = useAuth();
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
            <img src="/favicon.svg" alt="SuPreMe Learning Logo" className="brand-icon" />
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
        .auth-alert {
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .alert-danger {
          background: rgba(255, 77, 109, 0.1);
          color: #ff4d6d;
          border: 1px solid rgba(255, 77, 109, 0.2);
        }
        .alert-success {
          background: rgba(45, 106, 79, 0.1);
          color: #2d6a4f;
          border: 1px solid rgba(45, 106, 79, 0.2);
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
