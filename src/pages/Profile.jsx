import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';
import { Save } from 'lucide-react';

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
            <label className="input-label">Profile Picture URL</label>
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
          box-shadow: 0 8px 24px rgba(255, 77, 109, 0.2);
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
          box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.15);
        }
        .form-actions {
          margin-top: 1rem;
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
      `}</style>
    </div>
  );
}
