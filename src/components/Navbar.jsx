import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen, LayoutDashboard, Moon, Sun } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="glass-panel navbar">
      <div className="nav-brand">
        <span className="logo">SuPreMe Learning</span>
      </div>

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
        <div className="user-profile">
          <img src={user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg'} alt="Avatar" className="avatar" />
          <span className="user-name">{user.user_metadata?.full_name || user.email}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary logout-btn">
          <LogOut size={16} /> Logout
        </button>
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
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
