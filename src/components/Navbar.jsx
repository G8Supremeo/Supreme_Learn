import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen, LayoutDashboard, Moon, Sun, User } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTheme = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="glass-panel navbar">
      <Link to="/" className="navbar-brand">
        <img src="/favicon.svg" alt="Logo" className="navbar-logo" />
        <span className="logo">SuPreMe University</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/catalog" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
          <BookOpen size={18} /> Catalog
        </NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
      </div>

      <div className="nav-actions">
        <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
          <Moon size={18} className="moon-icon" />
          <Sun size={18} className="sun-icon" />
        </button>
        <div className="profile-menu-container" ref={menuRef}>
          <button 
            className="user-profile-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img src={user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg'} alt="Avatar" className="avatar" />
            <span className="user-name">{user.user_metadata?.full_name || user.email.split('@')[0]}</span>
          </button>
          
          {isMenuOpen && (
            <div className="dropdown-menu animate-fade-in">
              <Link to="/profile" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                <User size={16} /> My Profile
              </Link>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout-item">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          margin: 1rem 2rem;
          position: sticky;
          top: 1rem;
          z-index: 100;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .navbar-logo {
          height: 38px;
          width: 38px;
        }
        .logo {
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--accent-primary);
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--accent-primary);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .profile-menu-container {
          position: relative;
        }
        .user-profile-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: 1px solid transparent;
          padding: 0.25rem 0.5rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .user-profile-btn:hover {
          background: rgba(0,0,0,0.03);
          border-color: rgba(0,0,0,0.05);
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-secondary);
        }
        .user-name {
          font-weight: 600;
          color: var(--text-primary);
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          width: 200px;
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 10px 24px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.2s, color 0.2s;
        }
        .dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--accent-primary);
        }
        .dropdown-divider {
          height: 1px;
          background: var(--glass-border);
          margin: 0.25rem 0;
        }
        .logout-item {
          color: #e5383b;
        }
        .logout-item:hover {
          background: rgba(229,56,59,0.1);
          color: #e5383b;
        }
        .icon-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .icon-btn:hover {
          background: var(--bg-secondary);
          color: var(--accent-primary);
        }
        .logout-btn {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
        
        /* Theme toggle icon logic */
        [data-theme='dark'] .moon-icon { display: none; }
        [data-theme='light'] .sun-icon, :root:not([data-theme]) .sun-icon { display: none; }
      `}</style>
    </nav>
  );
}
