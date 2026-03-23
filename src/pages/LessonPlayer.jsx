import React from 'react';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useProgress } from '../context/ProgressContext';
import { ProgressBar } from '../components/ProgressBar';
import { CheckCircle, Circle, PlayCircle, ArrowLeft } from 'lucide-react';

export function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const { getCourseById } = useCourses();
  const { isEnrolled, isLessonCompleted, markLessonComplete, getCourseProgressPercentage } = useProgress();

  const course = getCourseById(courseId);

  if (!course) return <Navigate to="/catalog" replace />;
  if (!isEnrolled(courseId)) return <Navigate to={`/course/${courseId}`} replace />;

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  if (currentLessonIndex === -1) return <Navigate to={`/course/${courseId}`} replace />;

  const lesson = course.lessons[currentLessonIndex];
  const isCompleted = isLessonCompleted(courseId, lessonId);
  const progress = getCourseProgressPercentage(courseId);

  return (
    <div className="lesson-player-layout animate-fade-in">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-header">
          <NavLink to={`/course/${courseId}`} className="back-btn">
            <ArrowLeft size={16} /> Course Overview
          </NavLink>
          <h2 className="sidebar-title">{course.title}</h2>
          <ProgressBar percentage={progress} label="Course Progress" />
        </div>
        
        <div className="playlist">
          {course.lessons.map((l, idx) => {
            const completed = isLessonCompleted(courseId, l.id);
            return (
              <NavLink 
                key={l.id} 
                to={`/course/${courseId}/lesson/${l.id}`}
                className={({isActive}) => `playlist-item ${isActive ? 'active' : ''}`}
              >
                <span className="playlist-icon">
                  {completed ? <CheckCircle size={18} className="completed" /> : <Circle size={18} />}
                </span>
                <span className="playlist-text">
                  <span className="idx">{idx + 1}.</span> {l.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      </aside>

      {/* Main Player */}
      <section className="player-content">
        <div className="video-container glass-panel">
          {/* Mock Video Element using HTML5 Video wrapper */}
          <div className="video-wrapper">
            <video 
              key={lesson.id} 
              controls 
              poster={course.thumbnail}
            >
              <source src={lesson.videoUrl} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
          
          <div className="video-info">
            <div className="video-meta">
              <h1>{lesson.title}</h1>
              <span className="duration"><PlayCircle size={16} /> {lesson.duration}</span>
            </div>
            
            <button 
              className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} complete-btn`}
              onClick={() => markLessonComplete(courseId, lessonId)}
              disabled={isCompleted}
            >
              <CheckCircle size={18} />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        <div className="lesson-notes glass-panel">
          <h3>Lesson Resources</h3>
          <p>This is where you can write notes or view supplementary materials for: <strong>{lesson.title}</strong>.</p>
          <p>To take advantage of your AI learning tutor, try clicking the chat bubble in the bottom right and asking a question grounded in this concept!</p>
        </div>
      </section>

      <style>{`
        .lesson-player-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          min-height: calc(100vh - 120px);
        }
        @media (max-width: 900px) {
          .lesson-player-layout {
            grid-template-columns: 1fr;
          }
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }
        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .back-btn:hover {
          color: var(--accent-primary);
        }
        .sidebar-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .playlist {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .playlist::-webkit-scrollbar {
          width: 4px;
        }
        .playlist::-webkit-scrollbar-thumb {
          background: var(--glass-border);
        }
        .playlist-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-secondary);
          transition: background 0.2s, color 0.2s;
        }
        .playlist-item:hover {
          background: rgba(255, 77, 109, 0.05);
          color: var(--text-primary);
        }
        .playlist-item.active {
          background: rgba(255, 77, 109, 0.1);
          color: var(--accent-primary);
          border-left: 4px solid var(--accent-primary);
        }
        .playlist-icon {
          margin-top: 2px;
        }
        .completed {
          color: var(--success);
        }
        .playlist-text {
          font-size: 0.95rem;
          line-height: 1.4;
          font-weight: 500;
        }
        .idx { opacity: 0.7; }

        .player-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .video-container {
          overflow: hidden;
        }
        .video-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
        }
        video {
          width: 100%;
          height: 100%;
          outline: none;
        }
        .video-info {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .video-meta h1 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .duration {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .complete-btn {
          min-width: 200px;
        }
        .complete-btn:disabled {
          background: rgba(45, 106, 79, 0.1);
          color: var(--success);
          border-color: transparent;
          cursor: default;
          box-shadow: none;
        }
        .lesson-notes {
          padding: 2rem;
        }
        .lesson-notes h3 {
          margin-bottom: 1rem;
          color: var(--accent-primary);
        }
        .lesson-notes p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
