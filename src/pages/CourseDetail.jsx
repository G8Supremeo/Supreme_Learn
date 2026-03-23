import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useProgress } from '../context/ProgressContext';
import { useNotification } from '../hooks/useNotification';
import { PlayCircle, Award, Clock, Users, ArrowLeft } from 'lucide-react';

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  const { enrollCourse, isEnrolled, getCourseProgressPercentage } = useProgress();
  const { showNotification } = useNotification();

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="main-content">
        <h2>Course not found</h2>
        <Link to="/catalog" className="btn btn-secondary">Back to Catalog</Link>
      </div>
    );
  }

  const enrolled = isEnrolled(courseId);
  const progress = getCourseProgressPercentage(courseId);

  const handleEnroll = () => {
    enrollCourse(courseId);
    showNotification('Successfully enrolled in ' + course.title);
    navigate(`/course/${courseId}/lesson/${course.lessons[0].id}`);
  };

  const handleContinue = () => {
    navigate(`/course/${courseId}/lesson/${course.lessons[0].id}`); // Ideally point to last unwatched
  };

  return (
    <div className="course-detail animate-fade-in">
      <Link to="/catalog" className="back-link">
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div className="glass-panel detail-hero">
        <div className="hero-content">
          <span className="badge">{course.level}</span>
          <h1 className="title">{course.title}</h1>
          <p className="description">{course.description}</p>
          
          <div className="meta">
            <span><Clock size={16}/> {course.duration}</span>
            <span><Users size={16}/> {course.instructor}</span>
            <span><PlayCircle size={16}/> {course.lessons.length} Lessons</span>
          </div>

          <div className="cta-container">
            {enrolled ? (
              <div className="enrolled-status">
                <div className="progress-info">
                  <Award size={24} className="success-icon" />
                  <span>You are enrolled</span>
                  <span className="dot">•</span>
                  <span>{progress}% Complete</span>
                </div>
                <button onClick={handleContinue} className="btn btn-primary">
                  {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                </button>
              </div>
            ) : (
              <button onClick={handleEnroll} className="btn btn-primary enroll-btn">
                Enroll Now for Free
              </button>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img src={course.thumbnail} alt={course.title} />
        </div>
      </div>

      <div className="lesson-list glass-panel">
        <h2>Course Curriculum</h2>
        <div className="lessons">
          {course.lessons.map((lesson, idx) => (
            <div key={lesson.id} className="lesson-item">
              <div className="lesson-meta">
                <span className="lesson-number">{idx + 1}</span>
                <span className="lesson-title">{lesson.title}</span>
              </div>
              <span className="lesson-duration"><Clock size={14}/> {lesson.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .course-detail {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          transition: color 0.3s;
          font-weight: 500;
        }
        .back-link:hover {
          color: var(--accent-primary);
        }
        .detail-hero {
          display: flex;
          gap: 2rem;
          padding: 2.5rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .detail-hero { flex-direction: column-reverse; }
        }
        .hero-content {
          flex: 1;
        }
        .badge {
          display: inline-block;
          background: rgba(255, 77, 109, 0.15);
          color: var(--accent-primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .meta {
          display: flex;
          gap: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }
        .meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .enroll-btn {
          font-size: 1.1rem;
          padding: 1rem 2rem;
        }
        .enrolled-status {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .progress-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--success);
          font-weight: 600;
        }
        .success-icon {
          color: var(--success);
        }
        .dot { color: var(--text-secondary); }
        .hero-image {
          flex: 1;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--glass-shadow);
        }
        .hero-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .lesson-list {
          padding: 2.5rem;
        }
        .lesson-list h2 {
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        .lessons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .lesson-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: var(--card-bg);
          border-radius: 8px;
          border: 1px solid var(--glass-border);
        }
        .lesson-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .lesson-number {
          background: rgba(255, 77, 109, 0.1);
          color: var(--accent-primary);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 700;
        }
        .lesson-title {
          font-weight: 600;
          color: var(--text-primary);
        }
        .lesson-duration {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
