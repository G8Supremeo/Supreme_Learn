import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useProgress } from '../context/ProgressContext';
import { ProgressBar } from '../components/ProgressBar';
import { Edit2, Save, X } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';

export function Dashboard() {
  const { user, updateProfile } = useAuth();
  const { courses } = useCourses();
  const { isEnrolled, getCourseProgressPercentage } = useProgress();
  const { showNotification } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.user_metadata?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);

  const enrolledCourses = courses.filter(course => isEnrolled(course.id));

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      showNotification('Profile name cannot be empty', 'error');
      return;
    }
    try {
      setIsSaving(true);
      await updateProfile({ full_name: editName });
      setIsEditing(false);
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-panel">
        <div className="profile-section">
          <img src={user?.user_metadata?.avatar_url} alt="Profile" className="dash-avatar" />
          <div className="welcome">
            {isEditing ? (
              <div className="edit-form animate-fade-in">
                <input 
                  type="text" 
                  value={editName} 
                  onChange={e => setEditName(e.target.value)} 
                  className="edit-input"
                  disabled={isSaving}
                  autoFocus
                />
                <div className="edit-actions">
                  <button onClick={handleSaveProfile} className="btn btn-primary btn-sm" disabled={isSaving}>
                    <Save size={14} /> {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="icon-btn-close" disabled={isSaving}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="name-display">
                <h1>Welcome back, {user?.user_metadata?.full_name}!</h1>
                <button onClick={() => setIsEditing(true)} className="edit-btn" title="Edit Profile">
                  <Edit2 size={16} /> Edit
                </button>
              </div>
            )}
            <p className="dash-email">{user?.email}</p>
            <p>Pick up where you left off and keep leveling up.</p>
          </div>
        </div>
        
        <div className="stats">
          <div className="stat-box">
            <span className="stat-num">{enrolledCourses.length}</span>
            <span className="stat-label">Enrolled</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Your Learning Path</h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="enrolled-grid">
            {enrolledCourses.map(course => {
              const progress = getCourseProgressPercentage(course.id);
              return (
                <div key={course.id} className="enrolled-card glass-panel">
                  <div className="card-top">
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="top-info">
                      <h3>{course.title}</h3>
                      <p>{course.lessons.length} Lessons</p>
                    </div>
                  </div>
                  <div className="card-bottom">
                    <ProgressBar percentage={progress} label="Completion" />
                    <a href={`/course/${course.id}`} className="btn btn-secondary resume-btn">
                      {progress === 100 ? 'Review' : 'Resume'}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-dashboard glass-panel">
            <div className="empty-graphic">🎓</div>
            <h3>No courses yet</h3>
            <p>You haven't enrolled in any courses. Explore the catalog to start learning!</p>
            <a href="/catalog" className="btn btn-primary">Browse Catalog</a>
          </div>
        )}
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem;
          background: linear-gradient(135deg, rgba(255,77,109,0.1), transparent);
          flex-wrap: wrap;
          gap: 2rem;
        }
        .profile-section {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .dash-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid var(--accent-primary);
          background: #fff;
        }
        .name-display {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.2rem;
        }
        .name-display h1 {
          font-size: 2.2rem;
          color: var(--accent-primary);
          margin: 0;
        }
        .edit-btn {
          background: rgba(255, 77, 109, 0.1);
          color: var(--accent-primary);
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          transition: background 0.2s;
        }
        .edit-btn:hover {
          background: rgba(255, 77, 109, 0.2);
        }
        .edit-form {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.2rem;
        }
        .edit-input {
          font-size: 1.5rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--accent-primary);
          background: var(--card-bg);
          color: var(--text-primary);
          outline: none;
          width: 300px;
        }
        .edit-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
        .dash-email {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          opacity: 0.8;
        }
        .welcome p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .stats {
          display: flex;
          gap: 1.5rem;
        }
        .stat-box {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          padding: 1.5rem 2.5rem;
          border-radius: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-num {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
        }
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 0.5rem;
        }
        .dashboard-content h2 {
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }
        
        /* Layout resets below matching original... */
        .enrolled-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        .enrolled-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: transform 0.3s;
        }
        .enrolled-card:hover {
          transform: translateY(-4px);
        }
        .card-top {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .card-top img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
        }
        .top-info h3 {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .top-info p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .card-bottom {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .resume-btn {
          width: 100%;
          text-align: center;
        }
        .empty-dashboard {
          padding: 5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .empty-graphic {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .empty-dashboard h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }
        .empty-dashboard p {
          color: var(--text-secondary);
          max-width: 400px;
          margin: 0 auto 1rem;
        }
      `}</style>
    </div>
  );
}
