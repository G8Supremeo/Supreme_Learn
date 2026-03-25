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

  const enrolledCourses = courses.filter(course => isEnrolled(course.id));

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-panel">
        <div className="profile-section">
          <img src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`} alt="Profile" className="dash-avatar" />
          <div className="welcome">
            <div className="name-display">
              <h1>Welcome back, {user?.user_metadata?.full_name || 'Student'}!</h1>
            </div>
            <div className="user-details">
              <p className="dash-email">📧 {user?.email}</p>
              {user?.user_metadata?.phone && <p className="dash-phone">📞 {user.user_metadata.phone}</p>}
              <p className="dash-motto">Pick up where you left off and keep leveling up.</p>
            </div>
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
        .user-details {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .dash-email, .dash-phone, .dash-motto {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0;
        }
        .dash-motto {
          margin-top: 0.5rem;
          color: var(--text-primary);
          opacity: 0.8;
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
