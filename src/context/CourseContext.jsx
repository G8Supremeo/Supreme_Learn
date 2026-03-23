import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COURSES } from '../data/mockData';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setCourses(INITIAL_COURSES);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getCourseById = (id) => {
    return courses.find(c => c.id === id);
  };

  return (
    <CourseContext.Provider value={{ courses, loading, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
}

// Hook 4: useCourses
export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
