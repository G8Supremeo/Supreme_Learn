import React from 'react';
import { NavLink } from 'react-router-dom';
import { Clock, BarChart2 } from 'lucide-react';

export function CourseCard({ course }) {
  return (
    <div className="glass-panel course-card">
      <div className="card-image">
        <img src={course.thumbnail} alt={course.title} loading="lazy" />
        <span className="card-badge">{course.level}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{course.title}</h3>
        <p className="card-description">{course.description}</p>
        
        <div className="card-meta">
          <span className="meta-item"><Clock size={14}/> {course.duration}</span>
          <span className="meta-item"><BarChart2 size={14}/> {course.lessons.length} Lessons</span>
        </div>
        
        <NavLink to={`/course/${course.id}`} className="btn btn-secondary card-btn">
          View Details
        </NavLink>
      </div>

      <style>{`
        .course-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(255, 77, 109, 0.2);
        }
        .card-image {
          height: 180px;
          position: relative;
          overflow: hidden;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .course-card:hover .card-image img {
          transform: scale(1.05);
        }
        .card-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--card-bg);
          color: var(--accent-primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .card-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .card-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .card-btn {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
