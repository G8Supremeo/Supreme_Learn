import React, { useState } from 'react';
import { useCourses } from '../context/CourseContext';
import { CourseCard } from '../components/CourseCard';
import { Search } from 'lucide-react';

export function Catalog() {
  const { courses, loading } = useCourses();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="catalog-container animate-fade-in">
      <div className="catalog-header">
        <div className="header-content">
          <h1>Explore Courses</h1>
          <p>Find the perfect course to level up your skills today.</p>
        </div>
        
        <div className="search-bar glass-panel">
          <Search size={20} className="search-icon" />
          <input 
            type="text"
            placeholder="Search by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="rosy-loader"></div>
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="empty-state glass-panel">
              <h3>No courses found</h3>
              <p>Try adjusting your search query.</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .catalog-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .header-content h1 {
          font-size: 2.5rem;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }
        .header-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          border-radius: 99px;
          min-width: 300px;
        }
        .search-icon {
          color: var(--text-secondary);
        }
        .search-bar input {
          border: none;
          background: transparent;
          outline: none;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          width: 100%;
        }
        .search-bar input::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
        }
        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .loader-container {
          display: flex;
          justify-content: center;
          padding: 4rem 0;
        }
        .rosy-loader {
          width: 48px;
          height: 48px;
          border: 4px solid var(--glass-border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .empty-state {
          grid-column: 1 / -1;
          padding: 4rem;
          text-align: center;
        }
        .empty-state h3 {
          font-size: 1.5rem;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
