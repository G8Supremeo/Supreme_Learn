import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';
import { LogIn } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    const success = login(email);
    if (success) {
      const origin = location.state?.from?.pathname || '/catalog';
      navigate(origin, { replace: true });
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel login-panel animate-fade-in">
        <div className="login-header">
          <div className="logo-icon">✨</div>
          <h1>Welcome to RosyLearn</h1>
          <p>Sign in to continue your learning journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
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
          
          <button type="submit" className="btn btn-primary login-btn">
            <LogIn size={18} />
            Sign In
          </button>
        </form>
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
          padding: 3rem;
          width: 100%;
          max-width: 450px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .login-header {
          text-align: center;
        }
        .logo-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .login-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }
        .login-header p {
          color: var(--text-secondary);
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .login-btn {
          width: 100%;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
