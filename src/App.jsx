import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { PrivateRoute } from './components/PrivateRoute';

// Placeholders for Pages
const Login = () => <div className="main-content"><h2>Login Page</h2></div>;
const Dashboard = () => <div className="main-content"><h2>Dashboard</h2></div>;
const Catalog = () => <div className="main-content"><h2>Course Catalog</h2></div>;
const CourseDetail = () => <div className="main-content"><h2>Course Detail</h2></div>;
const LessonPlayer = () => <div className="main-content"><h2>Lesson Player</h2></div>;

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/catalog"
              element={
                <PrivateRoute>
                  <Catalog />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/course/:courseId"
              element={
                <PrivateRoute>
                  <CourseDetail />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/course/:courseId/lesson/:lessonId"
              element={
                <PrivateRoute>
                  <LessonPlayer />
                </PrivateRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/catalog" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
