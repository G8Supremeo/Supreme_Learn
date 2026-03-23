import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useCourses } from './CourseContext';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  // Store shape: { [userId]: { [courseId]: { enrolled: true, completedLessons: ['l1.1'] } } }
  const [progressData, setProgressData] = useLocalStorage('elearning_progress', {});

  const enrollCourse = (courseId) => {
    if (!user) return;
    setProgressData(prev => ({
      ...prev,
      [user.id]: {
        ...(prev[user.id] || {}),
        [courseId]: {
          enrolled: true,
          completedLessons: prev[user.id]?.[courseId]?.completedLessons || []
        }
      }
    }));
  };

  const markLessonComplete = (courseId, lessonId) => {
    if (!user) return;
    setProgressData(prev => {
      const userProgress = prev[user.id] || {};
      const courseProgress = userProgress[courseId] || { enrolled: true, completedLessons: [] };
      const completed = new Set(courseProgress.completedLessons);
      completed.add(lessonId);

      return {
        ...prev,
        [user.id]: {
          ...userProgress,
          [courseId]: {
            ...courseProgress,
            completedLessons: Array.from(completed)
          }
        }
      };
    });
  };

  const isEnrolled = (courseId) => {
    return !!(user && progressData[user.id]?.[courseId]?.enrolled);
  };

  const isLessonCompleted = (courseId, lessonId) => {
    return !!(user && progressData[user.id]?.[courseId]?.completedLessons?.includes(lessonId));
  };

  const getCourseProgressPercentage = (courseId) => {
    if (!user) return 0;
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    const completed = progressData[user.id]?.[courseId]?.completedLessons?.length || 0;
    return Math.round((completed / course.lessons.length) * 100);
  };

  const value = useMemo(() => ({
    enrollCourse,
    markLessonComplete,
    isEnrolled,
    isLessonCompleted,
    getCourseProgressPercentage
  }), [progressData, user, courses]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// Hook 5: useProgress
export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
