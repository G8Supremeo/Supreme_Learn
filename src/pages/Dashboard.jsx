import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useProgress } from '../context/ProgressContext';
import { CourseCard } from '../components/CourseCard';
import { ProgressBar } from '../components/ProgressBar';

export function Dashboard() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { isEnrolled, getCourseProgressPercentage } = useProgress();

  const enrolledCourses = courses.filter(course => isEnrolled(course.id));

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header glass-panel">
        <div className="welcome">
          <h1>Welcome back, {user.name}!</h1>
          <p>Pick up where you left off and keep leveling up.</p>
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
        .welcome h1 {
          font-size: 2.2rem;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
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
