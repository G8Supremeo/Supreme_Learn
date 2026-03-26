import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';
import { Save } from 'lucide-react';

const AVATAR_OPTIONS = [
  { id: 'visionary', name: 'Visionary', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Elon&backgroundColor=b6e3f4' },
  { id: 'pioneer', name: 'Pioneer', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ada&backgroundColor=ffdfbf' },
  { id: 'founder', name: 'Founder', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Sam&backgroundColor=c0aede' },
  { id: 'scientist', name: 'Scientist', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Yann&backgroundColor=d1d4f9' },
  { id: 'professor', name: 'Professor', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Andrew&backgroundColor=ffd5dc' },
  { id: 'genius', name: 'Genius', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Alan&backgroundColor=b6e3f4' },
];

export function Profile() {
  const { user, updateProfile } = useAuth();
  const { showNotification } = useNotification();

  const [editName, setEditName] = useState(user?.user_metadata?.full_name || '');
  const [editPhone, setEditPhone] = useState(user?.user_metadata?.phone || '');
  const [editAvatar, setEditAvatar] = useState(user?.user_metadata?.avatar_url || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      showNotification('Profile name cannot be empty', 'error');
      return;
    }
    try {
      setIsSaving(true);
      await updateProfile({ 
        full_name: editName,
        phone: editPhone,
        avatar_url: editAvatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`
      });
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page-container animate-fade-in">
      <div className="glass-panel profile-panel">
        <div className="profile-header">
          <img src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`} alt="Profile" className="profile-avatar-large" />
          <h2>My Profile</h2>
          <p className="profile-email">{user?.email}</p>
        </div>
        
        <form onSubmit={handleSaveProfile} className="profile-form">
          <div className="form-group">
            <label className="input-label">Full Name</label>
            <input 
              type="text" 
              value={editName} 
              onChange={e => setEditName(e.target.value)} 
              className="input-field"
              disabled={isSaving}
            />
          </div>
          <div className="form-group">
            <label className="input-label">Phone Number</label>
            <input 
              type="tel" 
              value={editPhone} 
              onChange={e => setEditPhone(e.target.value)} 
              className="input-field"
              placeholder="+1 234 567 8900"
              disabled={isSaving}
            />
          </div>
          <div className="form-group">
            <label className="input-label">Choose an Avatar</label>
            <div className="avatar-selection-grid">
              {AVATAR_OPTIONS.map(avatar => (
                <div 
                  key={avatar.id} 
                  className={`avatar-option ${editAvatar === avatar.url ? 'selected' : ''}`}
                  onClick={() => setEditAvatar(avatar.url)}
                  title={avatar.name}
                >
                  <img src={avatar.url} alt={avatar.name} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="input-label">Or Custom URL</label>
            <input 
              type="url" 
              value={editAvatar} 
              onChange={e => setEditAvatar(e.target.value)} 
              className="input-field"
              placeholder="https://example.com/avatar.png"
              disabled={isSaving}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary save-btn" disabled={isSaving}>
              <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .profile-page-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 80vh;
          padding: 2rem;
        }
        .profile-panel {
          width: 100%;
          max-width: 500px;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border-radius: 24px;
        }
        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }
        .profile-avatar-large {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid var(--accent-primary);
          background: #ffffff;
          object-fit: cover;
          margin-bottom: 0.5rem;
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.2);
        }
        .profile-header h2 {
          font-size: 1.8rem;
          color: var(--text-primary);
          margin: 0;
        }
        .profile-email {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-left: 4px;
        }
        .input-field {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s;
          outline: none;
        }
        .input-field:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
        }
        .form-actions {
          margin-top: 1.5rem;
        }
        .save-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 48px;
          border-radius: 12px;
          font-size: 1rem;
        }
        
        /* Avatar Grid CSS */
        .avatar-selection-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.75rem;
          margin-top: 0.25rem;
        }
        .avatar-option {
          cursor: pointer;
          border-radius: 50%;
          padding: 3px;
          border: 2px solid transparent;
          transition: all 0.2s ease;
          background: #fff;
        }
        .avatar-option img {
          width: 100%;
          border-radius: 50%;
          display: block;
        }
        .avatar-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .avatar-option.selected {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.2);
          transform: scale(1.05);
        }
        
        @media (max-width: 600px) {
          .avatar-selection-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
