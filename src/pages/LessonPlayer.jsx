import React, { useState } from 'react';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useProgress } from '../context/ProgressContext';
import { ProgressBar } from '../components/ProgressBar';
import { QuizWidget } from '../components/QuizWidget';
import { CheckCircle, Circle, ArrowLeft, Tv } from 'lucide-react';

// Simple Markdown Renderer for the Reading Material
const MarkdownText = ({ text }) => {
  if (!text) return null;
  // Naive rendering for simple bold/lists/headers defined in mockData
  const htmlRows = text.split('\n').map((line, idx) => {
    let fmt = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (fmt.startsWith('### ')) return <h3 key={idx}>{fmt.replace('###', '')}</h3>;
    if (fmt.startsWith('- ')) return <li key={idx} style={{marginLeft: '1.5rem', marginBottom: '0.5rem'}} dangerouslySetInnerHTML={{__html: fmt.replace('-', '• ')}} />;
    if (fmt.startsWith('1. ') || fmt.startsWith('2. ') || fmt.startsWith('3. ')) {
      return <li key={idx} style={{marginLeft: '1.5rem', marginBottom: '0.5rem'}} dangerouslySetInnerHTML={{__html: fmt}} />;
    }
    if (fmt.trim() === '') return <br key={idx} />;
    return <p key={idx} dangerouslySetInnerHTML={{__html: fmt}} style={{marginBottom: '1rem', lineHeight: '1.6'}} />;
  });
  return <div className="markdown-content">{htmlRows}</div>;
};

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

  const handleQuizPass = () => {
    if (!isCompleted) markLessonComplete(courseId, lessonId);
  };

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
          
          <div className="video-wrapper">
            {lesson.videoId ? (
              <iframe 
                src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0`}
                title={lesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <div className="no-video">
                <Tv size={48} />
                <p>No video available for this lesson.</p>
              </div>
            )}
          </div>
          
          <div className="video-info">
            <div className="video-meta">
              <h1>{lesson.title}</h1>
            </div>
            {/* If there's NO quiz, allow manual complete. Else, they must pass the quiz. */}
            {!lesson.quiz && (
              <button 
                className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} complete-btn`}
                onClick={() => markLessonComplete(courseId, lessonId)}
                disabled={isCompleted}
              >
                <CheckCircle size={18} />
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </button>
            )}
            {lesson.quiz && isCompleted && (
              <span className="badge success-badge"><CheckCircle size={14}/> Verified Status</span>
            )}
          </div>
        </div>

        <div className="lesson-notes glass-panel">
          <h2>Reading Materials & Notes</h2>
          <div className="reading-material-box">
            <MarkdownText text={lesson.readingMaterial} />
          </div>
          <hr className="divider" />
          
          {lesson.quiz && (
            <QuizWidget quiz={lesson.quiz} onPass={handleQuizPass} />
          )}
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
          background: rgba(14, 165, 233, 0.05);
          color: var(--text-primary);
        }
        .playlist-item.active {
          background: rgba(14, 165, 233, 0.1);
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
          background: #0b0508;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        iframe {
          width: 100%;
          height: 100%;
          outline: none;
        }
        .no-video {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
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
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
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
        .success-badge {
          background: rgba(45, 106, 79, 0.1);
          color: var(--success);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
        }
        .lesson-notes {
          padding: 2.5rem;
        }
        .lesson-notes h2 {
          color: var(--accent-primary);
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }
        .reading-material-box {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }
        .markdown-content h3 {
          color: var(--text-primary);
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.3rem;
        }
        .divider {
          border: none;
          height: 1px;
          background: var(--glass-border);
          margin: 2.5rem 0;
        }
      `}</style>
    </div>
  );
}
